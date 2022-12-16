import html from '../../src/api/html';

describe('html', () => {
    it('joins attribute values', () => {
        const mockClass = 'foo-bar';
        const mockDataJest = 'baz-quux';
        const actual = html`<div class="${mockClass}" data-jest="${mockDataJest}"></div>`;

        expect(actual).toBe(`<div class="${mockClass}" data-jest="${mockDataJest}"></div>`);
    });
});