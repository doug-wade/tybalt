const fs = require('node:fs').promises;
const os = require('node:os');

module.exports = async (entryPoints) => {
    const tmpdir = await fs.mkdtemp(os.tmpdir() + '/');

    const filePath = `${tmpdir}/index.js`;
    const contents = entryPoints.reduce((acc, elem) => {
        return `${acc}\nimport '${elem}';`;
    }, '');

    await fs.writeFile(filePath, contents);

    return filePath;
};
