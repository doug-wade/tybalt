import { describe, expect, it, jest } from '@jest/globals';
import WrapperArray from '../../src/util/wrapper-array';

const getExpectedMessage = ({ method }: { method: string }) => {
    return `${method} must be called on a single wrapper, use at(i) to access a wrapper`;
};

describe('empty-wrapper', () => {
    it('returns true from exists()', () => {
        const elements = [document.createElement('div'), document.createElement('div')];
        const wrapper = new WrapperArray({ elements });

        expect(wrapper.exists()).toBeTruthy();
    });

    it('returns the correct length', () => {
        const elements = [document.createElement('div'), document.createElement('div')];
        const wrapper = new WrapperArray({ elements });

        expect(wrapper.length).toBe(elements.length);
    });

    it('returns an EmptyWrapper if find is called and there are no matches', () => {
        const elements = [document.createElement('div'), document.createElement('div')];

        const wrapper = new WrapperArray({ elements });

        expect(wrapper.find('span[data-jest="foo"]').exists()).toBeFalsy();
    });

    it('returns an EmptyWrapper when findAll is called and there are no matches', () => {
        const elements = [document.createElement('div'), document.createElement('div')];

        const wrapper = new WrapperArray({ elements });

        expect(wrapper.findAll('span[data-jest="foo"]').exists()).toBeFalsy();
    });
});
