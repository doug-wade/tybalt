import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName, implementationFileName } : ScaffoldContext) => {
    return `
        import { defineExample } from '@gambit/core';
        import ${pascalCaseName} from '${implementationFileName}';

        export default {
            component: ${pascalCaseName}
        };

        export const Default = defineExample({
            emits: ['increment'],
            props: { value: String },
            setup(props, ctx) {
                const count = reactive(0);
                const clickHandler = () => { 
                    count.value += 1;
                    this.emit('increment', count.value);
                };

                return {
                    count,
                    clickHandler
                };
            }
        });
    `
};