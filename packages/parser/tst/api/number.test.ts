import number from '../../src/api/number';

describe('number', () => {
    it('returns the number when a string is provided', async () => {
        const result = number.parse('123');

        expect(result).toBe(123);
    });

    it('returns a number when a number is provided', async () => {
        const result = number.parse(456);

        expect(result).toBe(456);
    });
});
