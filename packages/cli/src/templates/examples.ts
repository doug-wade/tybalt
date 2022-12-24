import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName, implementationFileName }: ScaffoldContext) => {
    return `
        import { number } from '@tybalt/validator';
        import { defineExample } from '@tybalt/core';
        import ${pascalCaseName} from '${implementationFileName}';

        export default {
            component: ${pascalCaseName}
        };

        export const Default = defineExample({
            emits: ['increment'],
            props: { value: { validator: number() } },
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
    `;
};
