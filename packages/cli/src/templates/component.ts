import type { ScaffoldContext } from '../types';

export default ({ kebabCaseName } : ScaffoldContext) => {
    return `
        import { defineComponent, reactive } from '@gambit/core';

        export default defineComponent({
            name: '${kebabCaseName}',
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