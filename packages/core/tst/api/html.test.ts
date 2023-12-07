import html from '../../src/api/html';

describe('html', () => {
    it('handles the happy case', () => {
        const mockClass = 'foo-bar';
        const mockDataJest = 'baz-quux';
        const mockListener = () => {}

        const actual = html`<div class="${mockClass}" data-jest="${mockDataJest}" @input="${mockListener}"></div>`;

        expect(actual).toStrictEqual({
            strings: ['<div class="', '" data-jest="', '" @input="', '"></div>'],
            keys: [mockClass, mockDataJest, mockListener]
        });
    });

    it('handles strings with no interpolations', () => {
        const actual = html`<div>hello world</div>`;

        expect(actual).toStrictEqual({
            strings: ['<div>hello world</div>'],
            keys: []
        });
    });

    it('handles the empty string', () => {
        const actual = html``;

        expect(actual).toStrictEqual({
            strings: [''],
            keys: []
        });
    });
});
