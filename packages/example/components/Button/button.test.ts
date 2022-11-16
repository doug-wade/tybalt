import { describe, it, expect, mount } from '@gambit/test-utils';
import Button from './button.component';

describe('button', () => {
    it('renders a button', async () => {
        const wrapper = await mount(Button);

        expect(wrapper.find('button').exists()).toBeTruthy();
    });

    it('should expose a slot', async () => {
        const slot = 'mock slot value';
        const wrapper = await mount(Button, {
            slot,
        });

        expect(wrapper.text()).toBe(slot);
    });
});