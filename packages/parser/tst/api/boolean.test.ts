import booleanParser from '../../src/api/boolean';

describe('booleanParser', () => {
    it('returns true when true is provided', async () => {
        const result = booleanParser.parse('true');

        expect(result).toBe(true);
    });

    it('returns false when false is provided', async () => {
        const result = booleanParser.parse('false');

        expect(result).toBe(false);
    });

    it('returns null when other values are provided', async () => {
        const result = booleanParser.parse('abc');

        expect(result).toBe(null);
    });
});
