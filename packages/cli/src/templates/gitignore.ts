import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName }: ScaffoldContext) => {
    return `node_modules/
_site/
dist/
*.out
coverage/
    `;
};
