#!/usr/bin/env node

import { Command } from 'commander';

import build from './commands/build.js';
import lint from './commands/lint.js';
import scaffold from './commands/scaffold.js';
import serve from './commands/serve.js';
import test from './commands/test.js';
import watch from './commands/watch.js';

const program = new Command();

program
  .name('@tybalt/cli')
  .description('vli for building tybalt components')
  .version('0.0.1');

[
    build,
    lint,
    scaffold,
    serve,
    test,
    watch,
].forEach(command => command({ program }));

program.parse();