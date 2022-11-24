import html from '../../src/api/html';

describe('html', () => {
    it('returns a render function', async () => {
        const expression = 'expression';
        expect(typeof html`${expression}` === 'function').toBeTruthy();
        expect((html`<div>${expression}</div>`)({ expression })).toContain(expression);
    });

    it('renders multiple values', async () => {
        const keyOne = 'keyOne';
        const keyTwo = 'keyTwo';
        const keyThree = 'keyThree';

        const rendered = (html`<p>${keyOne}${keyTwo}${keyThree}</p>`)({ keyOne, keyTwo, keyThree });

        expect(rendered).toContain(keyOne);
        expect(rendered).toContain(keyTwo);
        expect(rendered).toContain(keyThree);
    });
});