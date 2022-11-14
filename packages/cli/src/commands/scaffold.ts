import { toKebabCase, toPascalCase } from 'js-convert-case';
import componentTemplate from '../templates/component';
import examplesTemplate from '../templates/examples';

import { ScaffoldContext, ScaffoldCommandOptions, CommandContext } from '../types';

const validateName = ({ componentName }: { componentName: string }) => {
    const kebabCaseName = toKebabCase(componentName);

    if (!kebabCaseName.includes('-')) {
        throw new Error(`Web component names have to contain a '-' when converted to kebab case.`);
    }
}

const makeContext = ({ componentName }: { componentName: string }): ScaffoldContext => {
    const kebabCaseName = toKebabCase(componentName);
    const implementationFileName = `./src/${kebabCaseName}.component.ts`;

    return {
        kebabCaseName,
        pascalCaseName: toPascalCase(componentName),
        implementationFileName
    };
};

const action = (componentName: string, options: ScaffoldCommandOptions) => {
    validateName({ componentName });
    const context = makeContext({ componentName });

    if (options.component) {
        componentTemplate(context);
    }
    if (options.examples) {
        examplesTemplate(context);
    }
};

export default ({ program }: CommandContext) => {
    program.command('scaffold')
        .description('scaffold gambit-related files')
        .argument('<string>', 'target', 'component')
        .option('-n, --name', 'gambit-example')
        .option('-s, --styles', 'whether to generate a css module', true)
        .option('--template', 'whether to generate an html template', true)
        .option('-t, --tests', 'whether to generate unit tests', true)
        .option('-c, --component', 'whether to generate a component file', true)
        .option('-e, --example', 'whether to generate examples', true)
        .action(action);
};