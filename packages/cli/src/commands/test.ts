import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('test')
        .description('test a component or components')
        .argument('[string]', 'pattern', 'src/**/*.test.{ts|js}')
        .action((pattern: string) => {
            console.log(`called test with pattern ${pattern}`);
        });
};