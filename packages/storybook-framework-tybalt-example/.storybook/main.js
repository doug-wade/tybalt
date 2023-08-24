import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: ['../components/**/*.stories.ts'],
    addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-essentials')],
    framework: {
        name: getAbsolutePath('storybook-framework-tybalt'),
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
