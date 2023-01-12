import type { Command } from 'commander';

export type ScaffoldContext = {
    kebabCaseName: string;
    pascalCaseName: string;
    implementationFileName: string;
};

export type ScaffoldTarget = 'component' | 'eleventy' | 'library';

export type ScaffoldCommandOptions = {
    implementation: boolean;
    tests: boolean;
    styles: boolean;
    name: string;
};

export type CommandContext = {
    program: Command;
};
