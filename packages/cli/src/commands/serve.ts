import bs from "browser-sync";

import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('serve')
        .description('watch a component or components')
        .option('-e, --examples', 'whether to serve the examples', true)
        .option('-w, --website', 'whether to serve the website', true)
        .action((options: { examples: boolean, website: boolean }) => {
            const server = bs.create();

            bs.init({
                server: "./dist"
            });

            bs.reload("*.html");
        });
};