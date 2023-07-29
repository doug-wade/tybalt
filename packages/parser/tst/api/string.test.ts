import string from '../../src/api/string';

describe('string', () => {
    it('returns the string provided', async () => {
        const result = string.parse('derp');

        expect(result).toBe('derp');
    });

    it('returns the string false when false is provided', async () => {
        const result = string.parse(false);

        expect(result).toBe('false');
    });
});
