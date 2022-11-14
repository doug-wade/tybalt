import { describe, it, expect } from '@jest/globals';
import oneOf from '../../src/api/one-of';

const MOCK_VALUES = {
    ONE: "one",
    TWO: "two",
    THREE: "three"
};

describe('oneOf', () => {
    it('should pass when one of the values is provided', async () => {
        const validator = oneOf(Object.values(MOCK_VALUES));

        const result = await validator.validate(MOCK_VALUES.ONE);

        expect(result.passed).toBeTruthy();
    });

    it('should not pass when a number is provided', async () => {
        const validator = oneOf(Object.values(MOCK_VALUES));

        const result = await validator.validate(69);

        expect(result.passed).toBeFalsy();
    });
});