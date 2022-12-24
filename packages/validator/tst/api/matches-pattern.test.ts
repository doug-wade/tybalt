import { describe, it, expect } from '@jest/globals';
import matchesPattern from '../../src/api/matches-pattern';

const MOCK_REGEX_PATTERN = /.*@.*/;
const MOCK_STRING_PATTERN = '@';

describe('oneOf', () => {
    it('should pass when the value matches the regex pattern', async () => {
        const validator = matchesPattern(MOCK_REGEX_PATTERN);

        const result = await validator.validate('foo@bar');

        expect(result.passed).toBeTruthy();
    });

    it('should not pass when the value does not match the regex pattern', async () => {
        const validator = matchesPattern(MOCK_REGEX_PATTERN);

        const result = await validator.validate('foo-bar');

        expect(result.passed).toBeFalsy();
    });

    it('should pass when the value matches the string pattern', async () => {
        const validator = matchesPattern(MOCK_STRING_PATTERN);

        const result = await validator.validate('foo@bar');

        expect(result.passed).toBeTruthy();
    });

    it('should not pass when the value does not match the string pattern', async () => {
        const validator = matchesPattern(MOCK_STRING_PATTERN);

        const result = await validator.validate('foo-bar');

        expect(result.passed).toBeFalsy();
    });
});
