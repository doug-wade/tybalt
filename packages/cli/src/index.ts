#!/usr/bin/env node

import fsPromises from 'node:fs/promises';

import { Command } from 'commander';
import { findUp } from 'find-up';

import build from './commands/build.js';
import lint from './commands/lint.js';
import scaffold from './commands/scaffold.js';
import serve from './commands/serve.js';
import test from './commands/test.js';
import watch from './commands/watch.js';

(async () => {
    const program = new Command();
    const packageJsonLocation = await findUp('package.json');
    const packageJsonFileContents = await fsPromises.readFile(packageJsonLocation!, 'utf-8');
    const packageJson = JSON.parse(packageJsonFileContents);

    program.name('@tybalt/cli').description('cli for building tybalt components').version(packageJson.version);

    [build, lint, scaffold, serve, test, watch].forEach((command) => command({ program }));

    program.parse();
})();
