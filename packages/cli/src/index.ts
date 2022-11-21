#!/usr/bin/env node

import { Command } from 'commander';

import build from './commands/build';
import lint from './commands/lint';
import scaffold from './commands/scaffold';
import serve from './commands/serve';
import test from './commands/test';
import watch from './commands/watch';

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