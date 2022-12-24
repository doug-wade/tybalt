import { describe, expect, it, jest } from '@jest/globals';
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
});
