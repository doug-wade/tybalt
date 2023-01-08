const esbuild = require('esbuild');
const glob = require('glob');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const tybaltPlugin = require('@tybalt/esbuild-plugin').default;

const makeEsbuildEntryPoint = require('./make-esbuild-entry-point');

module.exports = (eleventyConfig, options) => {
    let { outfile, pattern } = options || {};

    // Work around a bug: https://github.com/11ty/eleventy/issues/2729
    const outdir = (directoriesConfig = eleventyConfig.dir || '_site');
    const pathPrefix = eleventyConfig.pathPrefix || '/tybalt/';

    outfile = outfile || `tybalt-out.js`;
    pattern = pattern || './components/*.js';

    eleventyConfig.addTransform('add component library', async (content, outputPath) => {
        const entryPoints = glob.sync(pattern).map((elem) => path.resolve(elem));

        const filePath = await makeEsbuildEntryPoint(entryPoints);

        esbuild.build({
            bundle: true,
            entryPoints: [filePath],
            outfile: `${outdir}/${outfile}`,
            plugins: [tybaltPlugin()],
        });

        if (!outputPath.endsWith('.html')) {
            return content;
        }

        const dom = new JSDOM(content);
        const document = dom.window.document;

        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', `${pathPrefix}${outfile}`);
        document.body.appendChild(scriptTag);

        return `<!doctype html>${document.documentElement.outerHTML}`;
    });
};
