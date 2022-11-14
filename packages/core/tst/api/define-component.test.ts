import { describe, it, expect } from '@jest/globals';
import { mount } from '@gambit/test-utils';
import defineComponent from '../../src/api/define-component';

describe('defineComponent', () => {
    it('creates a web component', async () => {
        const name = 'example-web-component';
        const component = defineComponent({ name });

        const wrapper = await mount(component);

        expect(wrapper.element).toBeInstanceOf(HTMLElement);
    });
});