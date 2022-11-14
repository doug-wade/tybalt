import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('serve')
        .description('watch a component or components')
        .option('-e, --examples', 'whether to serve the examples', true)
        .option('-w, --website', 'whether to serve the website', true)
        .action((options: { examples: boolean, website: boolean }) => {
            if (options.examples) {
                console.log(`serving examples...`);
            }
            if (options.website) {
                console.log(`serving website...`);
            }
        });
};