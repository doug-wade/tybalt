import {describe, expect, it, jest} from '@jest/globals';
import '../src/setup';

class MockWebComponent extends HTMLElement {
}
const mockWebComponentTagName = 'mock-web-component';  
describe('setup', () => {
    it('should intercept customElements.define calls', async () => {
        customElements.define(mockWebComponentTagName, MockWebComponent);

        expect(global.customElementsRegistry.get(mockWebComponentTagName)).toBe(MockWebComponent);
        expect(global.customElementsReverseRegistry.get(MockWebComponent)).toBe(mockWebComponentTagName);
    });
});