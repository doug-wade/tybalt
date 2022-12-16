import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';
import useObservable from '../../src/api/use-observable'

describe('component rendering', () => {
    it('renders observables returned from setup', async () => {
        const name = "template-method";
        const expected = 'corge';

        const component = defineComponent({ 
            name,
            shadowMode: 'open',
            template({ expected }) { 
                return html`<span>${expected}</span>`
            },  
            setup() { 
                const { observable, handler } = useObservable({ initialValue: expected });
                return { expected: observable };
            } 
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(expected);
    });
});