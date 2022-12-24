import { describe, it, expect } from '@jest/globals';
import required from '../../src/api/required';

describe('string', () => {
    it('should pass when a value is provided', async () => {
        const validator = required();

        const result = await validator.validate('this is truthy');

        expect(result.passed).toBeTruthy();
    });

    it('does throw when a string is not provided', async () => {
        const validator = required();

        const result = await validator.validate();

        expect(result.passed).toBeFalsy();
    });
});
