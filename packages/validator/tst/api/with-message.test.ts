import { describe, it, expect } from '@jest/globals';

import withMessage from '../../src/api/with-message';
import mockValidator from '../../src/util/mock-validator';

describe('withMessage', () => {
    it('should add a message to a validator that has not passed', async () => {
        const message = 'mock message';
        const validator = mockValidator({ passed: false });
        
        const underTest = withMessage(validator, message);
        const results = await underTest.validate('foo');

        expect(results.message).toBe(message);
    });

    it('should not add a message to a validator that has passed', async () => {
        const message = 'mock message';
        const validator = mockValidator({ passed: true });
        
        const underTest = withMessage(validator, message);
        const results = await underTest.validate('foo');

        expect(results.message).toBeFalsy();
    });

    it('should add a message to a validator function that returns false', async () => {
        const message = 'mock message';
        const validatorFunction = async () => false;

        const underTest = withMessage(validatorFunction, message);
        const results = await underTest.validate('foo');

        expect(results.message).toBe(message);
    });

    it('should not add a message to a validator function that returns true', async () => {
        const message = 'mock message';
        const validatorFunction = async () => true;

        const underTest = withMessage(validatorFunction, message);
        const results = await underTest.validate('foo');

        expect(results.message).toBeFalsy();
    });
});