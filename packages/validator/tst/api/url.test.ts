import { describe, it, expect } from '@jest/globals';
import url from '../../src/api/url';

describe('url', () => {
    it('should pass when passed an url', async () => {
        const validator = url();

        const result = await validator.validate('https://www.google.com');

        expect(result.passed).toBeTruthy();
    });

    it('should not pass when an invalid url is passed', async () => {
        const validator = url();

        const result = await validator.validate('i am invalid');

        expect(result.passed).toBeFalsy();
    });
});
