import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { toKebabCase, toPascalCase } from 'js-convert-case';
import mkdirp from 'mkdirp';
import util from 'node:util';

import WARNINGS from '../config/scaffold-warnings.js';
import { SCAFFOLD_TARGETS } from '../config/constants.js';
import {
    componentTemplate,
    stylesTemplate,
    testsTemplate,
    jestConfigTemplate,
    indexHtmlTemplate,
    eleventyConfigTemplate,
} from '../templates/index.js';
import { CommandContext, ScaffoldCommandOptions, ScaffoldContext, ScaffoldTarget } from '../types.js';

const execAsync = async (command: string) => {
    const promisifiedExec = util.promisify(exec);

    const { stdout, stderr } = await promisifiedExec(command);

    if (stdout) {
        console.log(chalk.blue('stdout:\r\n'));
        console.log(stdout);
        console.log();
    }
    if (stderr) {
        console.log(chalk.red('stderr:\r\n'));
        console.log(stderr);
        console.log();
    }
};

// We want to run npm i as few times as possible so that npm spends as little time calculating
// the ideal dependency closure as possible, and can parallelize as much as possible.
const dependencies = ['@tybalt/core', '@tybalt/validator'];
const devDependencies = ['@tybalt/esbuild-plugin', 'esbuild'];
const scripts: { [property: string]: { script: string; description: string } } = {};

// Installs all the dependencies
const installDependencies = async () => {
    console.log('installing dependencies; there may be errors');

    await execAsync(`npm i -S ${dependencies.join(' ')}`);
    await execAsync(`npm i -D ${devDependencies.join(' ')}`);
};

// Write all of the scripts scheduled to package.json
const writeScripts = async () => {
    console.log('adding the following scripts to package.json');

    await Promise.all(
        Object.entries(scripts).map(([scriptName, { script, description }]) => {
            execAsync(`npm pkg set 'scripts.${scriptName}'='${script}'`);
            console.log(`    ${scriptName}: ${description}`);
        }),
    );

    console.log('\r\n');
};

// Don't let the name confuse you, this is mostly about calculating warning messages to emit when we don't write files
// (it also writes files).
const writeFile = async ({
    filePath,
    fileContents,
    warning,
}: {
    filePath: string;
    fileContents: string;
    warning?: string;
}) => {
    if (fs.existsSync(filePath)) {
        console.warn(warning || WARNINGS.get(filePath) || `file ${filePath} already exists; refusing to overwrite`);
        return;
    }

    return fs.promises.writeFile(filePath, fileContents);
};

// Validates a web component name. Probably this should be in @tybalt/core, tbh.
const validateName = ({ componentName }: { componentName: string }) => {
    const kebabCaseName = toKebabCase(componentName);

    if (!kebabCaseName.includes('-')) {
        throw new Error(`Web component names must contain a '-' when converted to kebab case.`);
    }
};

// Creates a bundle of data used commonly when scaffolding a project or component.
const makeScaffoldingContext = ({ name }: { name: string }): ScaffoldContext => {
    const kebabCaseName = toKebabCase(name);
    const implementationFileName = `./src/${kebabCaseName}.component.ts`;

    return {
        kebabCaseName,
        pascalCaseName: toPascalCase(name),
        implementationFileName,
    };
};

// Scaffolding steps general to scaffolding any kind of project (fastify, eleventy, etc).
const scaffoldProject = async ({ projectName, options }: { projectName: string; options: ScaffoldCommandOptions }) => {
    // Create a safe workspace to work in to avoid stomping any current contents of the file system.
    if (fs.existsSync(projectName)) {
        throw new Error(
            `project directory ${projectName} already exists; please delete it or move it away before proceeding.`,
        );
    }

    await mkdirp(projectName);
    process.chdir(projectName);

    // We use yarn as a dev team, but npm is installed with nodejs, so it's always available.
    await execAsync('npm init --yes');

    if (options.tests) {
        devDependencies.push('@tybalt/test-utils', 'jest', 'jest-environment-jsdom', 'esbuild-jest', 'esbuild');

        writeFile({
            filePath: `jest.config.js`,
            fileContents: jestConfigTemplate(),
            warning: 'jest config cannot be written as it would overwrite an existing file',
        });

        scripts['test'] = { script: 'jest', description: 'run the unit tests' };
    }
};

// Scaffolding steps specific for scaffolding an eleventy site
const scaffoldEleventy = async ({ projectName, options }: { projectName: string; options: ScaffoldCommandOptions }) => {
    devDependencies.push('@tybalt/eleventy-plugin');
    devDependencies.push('@11ty/eleventy');

    const context = makeScaffoldingContext({ name: projectName });

    writeFile({
        filePath: `.eleventy.js`,
        fileContents: eleventyConfigTemplate(),
        warning: 'jest config cannot be written as it would overwrite an existing file',
    });
    writeFile({
        filePath: `index.html`,
        fileContents: indexHtmlTemplate(context),
        warning: 'index.html cannot be written as it would overwrite an existing file',
    });

    scripts['build'] = { script: 'eleventy', description: 'build the static website' };
    scripts['serve'] = { script: 'eleventy --serve', description: 'serve the local development website' };
};

// Scaffolding steps specific for scaffolding a fastify site
const scaffoldFastify = async ({ projectName, options }: { projectName: string; options: ScaffoldCommandOptions }) => {
    dependencies.push(
        '@fastify/autoload',
        '@fastify/sensible',
        '@fastify/static',
        'fastify',
        'fastify-cli',
        'fastify-plugin',
    );
    devDependencies.push('@11ty/eleventy');

    scripts['start'] = { script: 'fastify start -l info app.js', description: 'start the production server' };
    scripts['dev'] = { script: 'fastify start -w -l info -P app.js', description: 'start the development server' };
};

// Scaffolding steps specific to scaffolding a component
const scaffoldComponent = async ({
    componentName,
    options,
}: {
    componentName: string;
    options: ScaffoldCommandOptions;
}) => {
    validateName({ componentName });
    const context = makeScaffoldingContext({ name: componentName });
    const componentDirectory = path.resolve(`./components/${context.pascalCaseName}`);

    await mkdirp(componentDirectory);

    if (options.implementation) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.ts`,
            fileContents: componentTemplate(context),
            warning: 'Component implementation cannot be written as it would overwrite an existing file',
        });
    }

    if (options.styles) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.css`,
            fileContents: stylesTemplate(context),
            warning: 'Component styles cannot be written as it would overwrite an existing file',
        });
    }

    if (options.tests) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.test.ts`,
            fileContents: testsTemplate(context),
            warning: 'Component unit tests cannot be written as it would overwrite an existing file',
        });
    }
};

// Coerce the argument to a ScaffoldTarget; throw if it fails
const validateTarget = (target: string): ScaffoldTarget => {
    const cleanedTarget = target.trim().toLowerCase();

    if (Object.values(SCAFFOLD_TARGETS).some((potentialTarget) => cleanedTarget === potentialTarget)) {
        return <ScaffoldTarget>cleanedTarget;
    } else {
        throw new Error(`Must choose one of: ${Object.values(SCAFFOLD_TARGETS).join(', ')}; got ${target}`);
    }
};

const action = async (targetArg: string, options: ScaffoldCommandOptions) => {
    const target = validateTarget(targetArg);

    switch (target) {
        case 'library': {
            await scaffoldProject({ projectName: options.name, options });
            await scaffoldComponent({ componentName: 'HelloWorld', options });
            installDependencies();
            writeScripts();
            break;
        }
        case 'eleventy': {
            await scaffoldProject({ projectName: options.name, options });
            await scaffoldEleventy({ projectName: options.name, options });
            await scaffoldComponent({ componentName: 'HelloWorld', options });
            installDependencies();
            writeScripts();
            break;
        }
        case 'component': {
            await scaffoldComponent({ componentName: options.name, options });
            break;
        }
        case 'fastify': {
            await scaffoldProject({ projectName: options.name, options });
            await scaffoldFastify({ projectName: options.name, options });
            await scaffoldComponent({ componentName: 'HelloWorld', options });
            installDependencies();
            writeScripts();
            break;
        }
    }
};

export default ({ program }: CommandContext) => {
    program
        .command('scaffold')
        .description('scaffold tybalt-related files')
        .argument('[string]', 'whether to create a project or a component', 'component')
        .requiredOption('-n, --name <string>')
        .option('-s, --styles', 'whether to generate a separate css file', true)
        .option('-t, --tests', 'whether to generate unit tests', true)
        .option('-i, --implementation', 'whether to generate a component implementation file', true)
        .action(action);
};
