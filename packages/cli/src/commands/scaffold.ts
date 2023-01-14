import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { toKebabCase, toPascalCase } from 'js-convert-case';
import mkdirp from 'mkdirp';
import util from 'node:util';

import WARNINGS from '../config/scaffold-warnings.js';
import componentTemplate from '../templates/component.js';
import stylesTemplate from '../templates/styles.js';
import testsTemplate from '../templates/tests.js';

import { ScaffoldContext, ScaffoldCommandOptions, CommandContext, ScaffoldTarget } from '../types';

const execAsync = util.promisify(exec);

// We want to run npm i as few times as possible so that npm spends as little time calculating
// the ideal dependency closure as possible, and can parallelize as much as possible.
const dependencies = [
    '@tybalt/core',
    '@tybalt/validator'
];
const devDependencies: string[] = [];

const installDependencies = async () => {
    await execAsync(`npm i -S ${dependencies.join(' ')}`);
    await execAsync(`npm i -D ${devDependencies.join(' ')}`);
};

// Don't let the name confuse you, this is mostly about calculating warning messages to emit when we don't write files
// (it also writes files).
const writeFile = async ({ filePath, fileContents, warning }: { filePath: string, fileContents: string, warning?: string }) => {
    if (fs.existsSync(filePath)) {
        console.warn(warning || WARNINGS.get(filePath) || `file ${filePath} already exists; refusing to overwrite`);
        return;
    }

    return fs.promises.writeFile(filePath, fileContents);
}

// Validates a web component name. Probably this should be in @tybalt/core, tbh.
const validateName = ({ componentName }: { componentName: string }) => {
    const kebabCaseName = toKebabCase(componentName);

    if (!kebabCaseName.includes('-')) {
        throw new Error(`Web component names have to contain a '-' when converted to kebab case.`);
    }
};

// Creates a bundle of data used commonly when scaffolding a project or component.
const makeScaffoldingContext = ({ componentName }: { componentName: string }): ScaffoldContext => {
    const kebabCaseName = toKebabCase(componentName);
    const implementationFileName = `./src/${kebabCaseName}.component.ts`;

    return {
        kebabCaseName,
        pascalCaseName: toPascalCase(componentName),
        implementationFileName,
    };
};

// Scaffolding steps general to scaffolding any kind of project (fastify, eleventy, etc).
const scaffoldProject = async ({ projectName, options }: { projectName: string, options: ScaffoldCommandOptions }) => {
    // Create a safe workspace to work in to avoid stomping any current contents of the file system.
    if (fs.existsSync(projectName)) {
        throw new Error(
            `project directory ${projectName} already exists; please delete it or move it away before proceeding.`
        );
    }

    await mkdirp(projectName);
    process.chdir(projectName);

    // We use yarn as a dev team, but npm is installed with nodejs, so it's always available.
    await execAsync('npm init --yes');

    if (options.tests) {
        devDependencies.push('@tybalt/test-utils', 'jest', 'jest-environment-jsdom');
    }
};

// Scaffolding steps specific for scaffolding an eleventy site
const scaffoldEleventy = async ({ projectName, options }: { projectName: string, options: ScaffoldCommandOptions }) => {
    devDependencies.push('@tybalt/eleventy-plugin');
};

// Scaffolding steps specific to scaffolding a component
const scaffoldComponent = async ({ componentName, options }: { componentName: string, options: ScaffoldCommandOptions }) => {
    validateName({ componentName });
    const context = makeScaffoldingContext({ componentName });
    const componentDirectory = path.resolve(`./components/${context.pascalCaseName}`);
    console.log('mkdirp-ing', componentDirectory);
    await mkdirp(componentDirectory);

    if (options.implementation) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.ts`,
            fileContents: componentTemplate(context), 
            warning: 'Component implementation cannot be written as it would overwrite an existing file' 
        });
    }

    if (options.styles) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.css`,
            fileContents: stylesTemplate(context), 
            warning: 'Component styles cannot be written as it would overwrite an existing file' 
        });
    }

    if (options.tests) {
        writeFile({
            filePath: `${componentDirectory}/${context.kebabCaseName}.test.ts`,
            fileContents: testsTemplate(context), 
            warning: 'Component unit tests cannot be written as it would overwrite an existing file' 
        });
    }
}

const action = async (target: ScaffoldTarget, options: ScaffoldCommandOptions) => {
    if (target === 'library') {
        await scaffoldProject({ projectName: options.name, options });
        await scaffoldComponent({ componentName: 'HelloWorld', options });
    } else if (target === 'eleventy') {
        await scaffoldProject({ projectName: options.name, options });
        await scaffoldEleventy({ projectName: options.name, options });
        await scaffoldComponent({ componentName: 'HelloWorld', options });
    } else if (target === 'component') {
        await scaffoldComponent({ componentName: options.name, options });
    } else if (target === 'fastify') {
        console.log('fastify scaffolding coming soon!');
    } else {
        console.log('must choose one of library, eleventy or component; got', target);
    }
    installDependencies();
};

export default ({ program }: CommandContext) => {
    program
        .command('scaffold')
        .description('scaffold tybalt-related files')
        .argument('[string]', 'whether to create a project or a component', 'component')
        .option('-n, --name <string>', 'tybalt-example')
        .option('-s, --styles', 'whether to generate a separate css file', true)
        .option('-t, --tests', 'whether to generate unit tests', true)
        .option('-i, --implementation', 'whether to generate a component implementation file', true)
        .action(action);
};
