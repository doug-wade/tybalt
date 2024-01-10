import { expect, describe, it } from '@jest/globals';

import compose from '../../src/api/compose';
import mockValidator from '../../src/util/mock-validator';

describe('compose', () => {
    it('returns not passed if any validators have not passed', async () => {
        const underTest = compose(
            mockValidator({ passed: true }),
            mockValidator({ passed: false }),
            mockValidator({ passed: true }),
        );

        const results = await underTest.validate('foo');

        expect(results.passed).toBeFalsy();
    });

    it('should validate if null validators are passed and all are passing', async () => {
        const underTest = compose(mockValidator({ passed: true }), null, mockValidator({ passed: true }));

        const results = await underTest.validate('foo');

        expect(results.passed).toBeTruthy();
    });

    it('should fail validation if null validators are passed and some are failing', async () => {
        const underTest = compose(mockValidator({ passed: true }), null, mockValidator({ passed: false }));

        const results = await underTest.validate('foo');

        expect(results.passed).toBeFalsy();
    });

    it('should return the most severe level', async () => {
        const underTest = compose(
            mockValidator({ passed: false, level: 'warn' }),
            null,
            mockValidator({ passed: true, level: 'info' }),
        );

        const results = await underTest.validate('foo');

        expect(results.level).toBe('warn');
    });
});
