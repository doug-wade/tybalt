import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('lint')
        .description('lint a component or components')
        .argument('[string]', 'pattern', 'components/**/*.{ts|js}')
        .action((pattern) => {
            console.log(`called lint with pattern ${pattern}`);
        });
};