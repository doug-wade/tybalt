import { describe, expect, it } from '@jest/globals';
import Wrapper from '../../src/util/base-wrapper';
import mount from '../../src/api/mount';

const mockWebComponentSelector = 'mock-web-component-name';
class MockWebComponent extends HTMLElement {}

describe('mount', () => {
    beforeEach(() => {
        global.customElementsReverseRegistry = new Map([[MockWebComponent, mockWebComponentSelector]]);
    });

    it('should return a wrapper instance', async () => {
        const actual = await mount(MockWebComponent);

        expect(actual).toBeInstanceOf(Wrapper);
    });

    it('should throw if a web component has not been registered', async () => {
        global.customElementsReverseRegistry = new Map();

        expect(async () => {
            await mount(MockWebComponent);
        }).rejects.toThrow('Web component MockWebComponent was not registered with customElements.define()');
    });

    it('should set the innerHTML of the mounted component to the value of the slot', async () => {
        const slot = '<span class="foo">hello world</span>';

        const actual = await mount(MockWebComponent, { slot });

        expect(actual.element.outerHTML).toBe(`<${mockWebComponentSelector}>${slot}</${mockWebComponentSelector}>`);
    });

    it('should set the aria-label attribute', async () => {
        global.customElementsReverseRegistry = new Map([[MockWebComponent, 'mock-web-component-name']]);
        const mockAriaLabel = 'hello world';
        const attributes = { ariaLabel: mockAriaLabel };

        const actual = await mount(MockWebComponent, { attributes });

        expect(actual.element.getAttribute('aria-label')).toBe(mockAriaLabel);
    });

    it.each([[{ bar: 'baz' }], [123], [false], ['corge']])('should stringify attribute with type %s', async (prop) => {
        const originalSetAttribute = HTMLElement.prototype.setAttribute;
        const setAttributeSpy = jest.fn().mockImplementation(originalSetAttribute);
        HTMLElement.prototype.setAttribute = setAttributeSpy;
        global.customElementsReverseRegistry = new Map([[MockWebComponent, 'mock-web-component-name']]);

        await mount(MockWebComponent, { attributes: { prop } });

        expect(setAttributeSpy).toHaveBeenCalledTimes(2);
        expect(setAttributeSpy).toHaveBeenCalledWith('prop', typeof prop === 'string' ? prop : JSON.stringify(prop));
    });
});
