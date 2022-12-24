import withLevel from '../../src/api/with-level';
import { describe, it, expect } from '@jest/globals';

import { ValidationResults } from '../../src/types';

describe('withLevel', () => {
    it('adds a level to a validation result', async () => {
        const mockLogLevel = 'warn';
        const mockValidator = {
            async validate(): Promise<ValidationResults> {
                return {
                    level: 'error',
                    passed: false,
                    message: 'mock message',
                };
            },
        };

        const validator = withLevel(mockValidator, mockLogLevel);
        const result = await validator.validate();

        expect(result.level).toBe(mockLogLevel);
    });
});
