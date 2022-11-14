import {describe, expect, it} from '@jest/globals';
import Wrapper from '../../src/util/base-wrapper';
import mount from '../../src/api/mount';

class MockWebComponent extends HTMLElement {
}

describe('mount', () => {
    it('should return a wrapper instance', async () => {
        global.customElementsReverseRegistry = new Map([[MockWebComponent, 'mock-web-component-name']]);

        const actual = await mount(MockWebComponent);

        expect(actual).toBeInstanceOf(Wrapper);
    });

    it('should throw if a web component has not been registered', async () => {
        global.customElementsReverseRegistry = new Map();

        expect(async () => {
            await mount(MockWebComponent);
        }).rejects.toThrow('Web component MockWebComponent was not registered with customElements.define()');
    });
});