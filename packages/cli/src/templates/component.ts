import type { ScaffoldContext } from '../types';

export default ({ kebabCaseName } : ScaffoldContext) => {
    return `
        import { defineComponent, useObservable } from '@tybalt/core';
        import { number } from '@tybalt/validator';SSS

        export default defineComponent({
            name: '${kebabCaseName}',
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
    `
};