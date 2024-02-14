import { describe, expect, it } from '@jest/globals';
import render from '../../src/util/render';

describe('render', () => {
    it('should create a dom element', async () => {
        const actual = await render({ elementName: 'mock-web-component' });

        expect(actual).toBeInstanceOf(HTMLElement);
    });

    it('should add attributes correctly', async () => {
        const actual = await render({ elementName: 'mock-web-component', attributes: { ariaLabel: 'bar' } });

        expect(actual.outerHTML).toBe(`<mock-web-component aria-label="bar"></mock-web-component>`);
    });

    it('should render slots correctly', async () => {
        const actual = await render({ elementName: 'mock-web-component', slot: 'mock slot content' });

        expect(actual.outerHTML).toBe(`<mock-web-component>mock slot content</mock-web-component>`);
    });

    it('should render contexts correctly', async () => {
        const mockContextName = 'mock-context';
        const mockContextValue = 'foo';
        const mockContext = { name: mockContextName, initialValue: mockContextValue };

        let actual;
        const wrapper = await render({ elementName: 'mock-web-component', contexts: { mockContext } });
        wrapper.dispatchEvent(new CustomEvent('context-request', { 
            detail: {
                callback: (context) => { actual = context; },
                name: mockContextName,
            }
        }));

        expect(actual).toBe(mockContextValue);
    });
});
