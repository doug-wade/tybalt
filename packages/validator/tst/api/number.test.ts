import { describe, it, expect } from '@jest/globals';
import number from '../../src/api/number';

describe('number', () => {
    it('passes when a number is provided', async () => {
        const validator = number();

        const result = await validator.validate(420);

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when a string is provided', async () => {
        const validator = number();

        const result = await validator.validate('this is a string');

        expect(result.passed).toBeFalsy();
    });
});
