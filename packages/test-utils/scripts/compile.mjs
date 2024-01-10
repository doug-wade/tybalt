import * as esbuild from 'esbuild';

const dist = 'dist';
const platform = 'node';
const target = 'node18';
const entryPoints = ['src/**/*.ts', 'src/*.ts'];

const esmBuild = esbuild.build({
    entryPoints,
    format: 'esm',
    outdir: `${dist}/mjs`,
    target,
    platform,
    outExtension: { '.js': '.mjs' },

    // https://github.com/evanw/esbuild/issues/622#issuecomment-769462611
    bundle: true,
    plugins: [
        {
            name: 'add-mjs',
            setup(build) {
                build.onResolve({ filter: /.*/ }, (args) => {
                    if (args.importer) {
                        if (args.path.includes('.') && args.importer.includes('test-utils/src')) {
                            return {
                                path: `${args.path}.mjs`,
                                external: true,
                            };
                        }
                    }
                });
            },
        },
    ],
});

const cjsBuild = esbuild.build({
    entryPoints,
    format: 'cjs',
    outdir: `${dist}/cjs`,
    target,
    platform,
    bundle: true,
});

await Promise.all([esmBuild, cjsBuild]);
