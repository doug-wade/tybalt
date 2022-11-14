import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('build')
        .description('build a component or components')
        .option('-e, --examples', './components/**/*.examples.ts')
        .option('-c, --components', './components/**/*.component.ts')
        .option('-w, --website', './components/**/*.page.ts')
        .action((options) => {
            if (options.examples) {
                console.log(`building examples at path ${options.examples}...`);
            }
            if (options.components) {
                console.log(`building components at path ${options.components}`);
            }
            if (options.website) {
                console.log(`building website at path ${options.website}`);
            }
        });
};