import { describe, it, expect } from '@jest/globals';
import integer from '../../src/api/integer';

describe('integer', () => {
    it('passes when a integer is provided', async () => {
        const validator = integer();

        const result = await validator.validate(420);

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when a string is provided', async () => {
        const validator = integer();

        const result = await validator.validate('hey there');

        expect(result.passed).toBeFalsy();
    });

    it('does not pass when a decimal is provided', async () => {
        const validator = integer();

        const result = await validator.validate(6.9);

        expect(result.passed).toBeFalsy();
    });
});
