import { describe, it, expect } from '@jest/globals';
import ValidationError from '../../src/util/validation-error';

describe('ValidationError', () => {
    it('is an instance of Error', () => {
        const actual = new ValidationError();

        expect(actual instanceof Error).toBeTruthy();
    });
});
