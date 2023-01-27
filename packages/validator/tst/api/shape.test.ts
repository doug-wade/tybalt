import { describe, it, expect } from '@jest/globals';
import shape from '../../src/api/shape';

describe('array', () => {
    it('passes when a valid shape is provided', async () => {
        const validator = shape({
            foo: async () => ({ passed: true }),
            bar: async () => ({ passed: true }),
        });

        const result = await validator.validate({ foo: 'value', bar: 1 });

        expect(result.passed).toBeTruthy();
    });

    it('does not pass when an invalid shape is provided', async () => {
        const validator = shape({
            foo: async () => ({ passed: true }),
            bar: async () => ({ passed: false }),
        });

        const result = await validator.validate({ foo: 'value' });

        expect(result.passed).toBeFalsy();
    });

    it('does not pass for non-objects', async () => {
        const validator = shape({
            foo: async () => ({ passed: true }),
            bar: async () => ({ passed: true }),
        });

        const result = await validator.validate(69);

        expect(result.passed).toBeFalsy();
    });

    it('can pass for optional shapes', async () => {
        const validator = shape({
            foo: async () => ({ passed: true }),
            bar: async () => ({ passed: true }),
        });

        const result = await validator.validate(undefined);

        expect(result.passed).toBeTruthy();
    });
});
