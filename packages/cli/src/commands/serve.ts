import bs from 'browser-sync';
import { CommandContext } from '../types.js';

export default ({ program }: CommandContext) => {
    program
        .command('serve')
        .description('watch a component or components')
        .option('-e, --examples', 'whether to serve the examples', true)
        .option('-w, --website', 'whether to serve the website', true)
        .option('-p, --port <value>', 'which port to serve', '3000')
        .action((options: { examples: boolean; website: boolean; port: string }) => {
            const server = bs.create();
        
            bs.init({
                server: './dist',
                port: Number(options.port)
            });

            bs.reload('*.html');
        });
};
