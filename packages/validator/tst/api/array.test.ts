import { describe, it, expect } from '@jest/globals';
import array from '../../src/api/array';

describe('array', () => {
    it('passes when a array is provided', async () => {
        const validator = array();

        const result = await validator.validate([]);

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when a number is provided', async () => {
        const validator = array();

        const result = await validator.validate(69);

        expect(result.passed).toBeFalsy();
    });
});
