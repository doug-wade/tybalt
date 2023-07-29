import { describe, it, expect } from '@jest/globals';
import boolean from '../../src/api/boolean';

describe('boolean', () => {
    it('passes when true is provided', async () => {
        const validator = boolean();

        const result = await validator.validate(true);

        expect(result.passed).toBeTruthy();
    });

    it('passes when false is provided', async () => {
        const validator = boolean();

        const result = await validator.validate(false);

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when a string is provided', async () => {
        const validator = boolean();

        const result = await validator.validate('hey there');

        expect(result.passed).toBeFalsy();
    });

    it('does not pass when a decimal is provided', async () => {
        const validator = boolean();

        const result = await validator.validate(6.9);

        expect(result.passed).toBeFalsy();
    });
});
