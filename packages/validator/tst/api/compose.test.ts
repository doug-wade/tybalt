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
});