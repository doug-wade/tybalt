import bs from 'browser-sync';
import { CommandContext } from '../types.js';

export default ({ program }: CommandContext) => {
    program
        .command('serve')
        .description('watch a component or components')
        .option('-w, --website', 'whether to serve the website', true)
        .option('-p, --port <value>', 'which port to serve', '3000')
        .action((options: { website: boolean }) => {
            if (options.website) {
                bs.create();

                bs.init({
                    server: './dist',
                });

                bs.reload('*.html');
            }
        });
};
