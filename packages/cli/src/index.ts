#!/usr/bin/env node

import { Command } from 'commander';

import build from './commands/build';
import lint from './commands/lint';
import scaffold from './commands/scaffold';
import test from './commands/test';
import watch from './commands/watch';

const program = new Command();

program
  .name('@gambit/cli')
  .description('vli for building gambit components')
  .version('0.0.1');

[
    build,
    lint,
    // scaffold,
    test,
    // watch
].forEach(command => command({ program }));

program.parse();