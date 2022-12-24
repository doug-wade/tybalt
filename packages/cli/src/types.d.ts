import type { Command } from 'commander';

export type ScaffoldContext = {
    kebabCaseName: string;
    pascalCaseName: string;
    implementationFileName: string;
};

export type ScaffoldCommandOptions = {
    component: boolean;
    examples: boolean;
};

export type CommandContext = {
    program: Command;
};
