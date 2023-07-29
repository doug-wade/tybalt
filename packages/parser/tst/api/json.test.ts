import json from '../../src/api/json';

describe('json', () => {
    it('parses objects', async () => {
        const result = json.parse('{ "foo": "bar" }');

        expect(result).toStrictEqual({ foo: 'bar' });
    });
});
