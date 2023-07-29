import { describe, expect, it, jest } from '@jest/globals';
import EmptyWrapper from '../../src/util/empty-wrapper';

const MOCK_SELECTOR = 'tybalt-button';

class MockWebComponent extends HTMLElement {}

const getExpectedMessage = ({ method }: { method: string }) => {
    return `find did not return ${MOCK_SELECTOR}, cannot call ${method}() on empty Wrapper`;
};

describe('empty-wrapper', () => {
    it('returns false from exists()', () => {
        const wrapper = new EmptyWrapper({ selector: 'mock selector' });

        expect(wrapper.exists()).toBeFalsy();
    });

    it('returns 0 from length', () => {
        const wrapper = new EmptyWrapper({ selector: 'mock selector' });

        expect(wrapper.length).toBe(0);
    });

    it('throws when find is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'find' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.find(MOCK_SELECTOR);
        }).toThrow(expectedMessage);
    });

    it('throws when findAll is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'findAll' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.findAll(MOCK_SELECTOR);
        }).toThrow(expectedMessage);
    });

    it('throws when findComponent is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'findComponent' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.findComponent(MockWebComponent);
        }).toThrow(expectedMessage);
    });

    it('throws when findComponentAll is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'findComponentAll' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.findComponentAll(MockWebComponent);
        }).toThrow(expectedMessage);
    });

    it('throws when html is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'html' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.html();
        }).toThrow(expectedMessage);
    });

    it('throws when shadowHtml is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'shadowHtml' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.shadowHtml();
        }).toThrow(expectedMessage);
    });

    it('throws when text is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'text' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.text();
        }).toThrow(expectedMessage);
    });

    it('throws when attributes is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'attributes' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.attributes();
        }).toThrow(expectedMessage);
    });

    it('throws when classes is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'classes' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.classes();
        }).toThrow(expectedMessage);
    });

    it('throws when trigger is called', () => {
        const expectedMessage = getExpectedMessage({ method: 'trigger' });

        const wrapper = new EmptyWrapper({ selector: MOCK_SELECTOR });

        expect(() => {
            wrapper.trigger('click');
        }).toThrow(expectedMessage);
    });
});
