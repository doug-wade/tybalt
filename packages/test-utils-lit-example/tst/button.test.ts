import { describe, expect, jest, test } from '@jest/globals';
import { mount, flushPromises } from '@tybalt/test-utils';
import { Button } from '../src/button';

describe('button', () => {
    test('renders with a slot', async () => {
        jest.setTimeout(300000);

        const mockSlot = 'mock slot value';
        const mockAriaLabel = 'mock aria-label value';

        const attributes = {
            ariaLabel: mockAriaLabel,
        };
        const wrapper = await mount(Button, {
            slot: mockSlot,
            attributes,
        });

        await flushPromises();

        expect(wrapper.text()).toContain(mockSlot);
        expect(wrapper.attributes('aria-label')).toBe(mockAriaLabel);
        expect(wrapper.element.tagName).toBe('example-button'.toUpperCase());
    });
});
