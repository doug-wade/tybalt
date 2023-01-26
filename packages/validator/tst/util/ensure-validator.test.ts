import { describe, it, expect } from '@jest/globals';
import ensureValidator from '../../src/util/ensure-validator';
import array from '../../src/api/array';

describe('ensure-validator', () => {
    it('returns validators unchanged', () => {
        const actual = array();

        expect(ensureValidator(actual)).toBe(actual);
    });

    it('coerces funcitons to validators', () => {
        const validator = async () => ({
            passed: true,
        });

        expect(ensureValidator(validator).validate).toBeTruthy();
    });
});
