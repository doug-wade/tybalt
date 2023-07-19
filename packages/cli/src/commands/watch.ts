import type { CommandContext } from '../types.js';

export default ({ program }: CommandContext) => {
    program
        .command('watch')
        .description('watch a component or components')
        .argument('[string]', 'pattern', 'src/**/*.component.{ts|js}')
        .action((pattern) => {
            console.log(`called watch with pattern ${pattern}`);
        });
};
