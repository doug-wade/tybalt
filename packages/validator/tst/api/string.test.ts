import { describe, it, expect } from '@jest/globals';
import string from '../../src/api/string';

describe('string', () => {
    it('passes when a string is provided', async () => {
        const validator = string();

        const result = await validator.validate('this is a string');

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when a number is provided', async () => {
        const validator = string();

        const result = await validator.validate(69);

        expect(result.passed).toBeFalsy();
    });
});
