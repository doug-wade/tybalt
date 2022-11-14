import { describe, it, expect } from '@jest/globals';

import shouldThrow from '../../src/api/should-throw';
import ValidationError from '../../src/util/validation-error';
import mockValidator from '../../src/util/mock-validator';

describe('shouldThrow', () => {
    it('should throw if the validation fails', () => {
        const message = 'mock error message';
        const validator = mockValidator({ 
            passed: false, 
            level: "error",
            message,
        });

        const underTest = shouldThrow(validator);

        expect(async () => { await underTest.validate(); }).rejects.toThrow(message);
    });

    it('should not throw if the validation passes', () => {
        const validator = mockValidator({ passed: true });

        const underTest = shouldThrow(validator);

        expect(async () => { await underTest.validate() }).not.toThrow();
    });
});