import type { ScaffoldContext } from '../types';

export default ({ kebabCaseName }: ScaffoldContext) => {
    return `.${kebabCaseName} {
    color: rebeccapurple;
}`;
};
