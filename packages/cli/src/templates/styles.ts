import type { ScaffoldContext } from '../types.js';

export default ({ kebabCaseName }: ScaffoldContext) => {
    return `.${kebabCaseName} {
    color: rebeccapurple;
}`;
};
