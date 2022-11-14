import {describe, expect, it, jest} from '@jest/globals';
import getElementName from '../../src/util/get-element-name';

describe('get-element-name', () => {
    it('finds the name of a component definition', () => {
        const mockDefinition = class Button extends HTMLElement{};
        const mockElementName = 'example-button';
        global.customElementsReverseRegistry = new Map([[mockDefinition, mockElementName]]);

        const actual = getElementName({ definition: mockDefinition });

        expect(actual).toBe(mockElementName);
    });
});