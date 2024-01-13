#!/usr/bin/env node

import fsPromises from 'node:fs/promises';

import { Command } from 'commander';

import build from './commands/build.js';
import lint from './commands/lint.js';
import scaffold from './commands/scaffold.js';
import serve from './commands/serve.js';
import test from './commands/test.js';
import watch from './commands/watch.js';

import packageJson from "../package.json" with { type: "json" };

(async () => {
    const program = new Command();

    program.name('@tybalt/cli').description('cli for building tybalt components').version(packageJson.version);

    [build, lint, scaffold, serve, test, watch].forEach((command) => command({ program }));

    program.parse();
})();
