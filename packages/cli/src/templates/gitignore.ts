import type { ScaffoldContext } from '../types.js';

export default ({ pascalCaseName }: ScaffoldContext) => {
    return `node_modules/
_site/
dist/
*.out
coverage/
    `;
};
