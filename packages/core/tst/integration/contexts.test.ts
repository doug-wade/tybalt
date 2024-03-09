import { createContext } from '@tybalt/context';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';
import { mount } from '@tybalt/test-utils';

describe('contexts', () => {
    it('passes contexts to render', async () => {
        const name = 'context';
        const expected = 'foo bar';
        const context = createContext(name, expected);

        const component = defineComponent({
            name: 'passes-contexts-to-render',
            contexts: { example: context },
            render({ example }) {
                return html`<p>${example?.value}</p>`;
            }
        });
        
        const wrapper = await mount(component, {
            contexts: { 
                [name]: context,
            }
        });

        expect(wrapper.html()).toContain(`<p>${expected}</p>`);
    });

    it('passes contexts to setup', async () => {
        const name = 'context';
        const expected = 'baz quux';
        const context = createContext(name, expected);

        let actual = null;
        const component = defineComponent({
            name: 'passes-contexts-to-setup',
            contexts: { example: context },
            setup({ example }) {
                actual = example
            }
        });

        await mount(component, {
            contexts: { 
                [name]: context,
            }
        });

        expect(actual).toBe(undefined);
    });

    it('emits a warning if there is a collision', async () => {
        const jestSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const context = createContext('bmo mochi');

        await mount(
            defineComponent({
                name: 'throws-an-error-if-there-is-a-collision',
                props: {
                    example: { default: 'hello world' },
                },
                contexts: { example: context },
            }),
        );

        expect(jestSpy.mock.calls[0][0]).toBe('Collision detected between context and prop: example');
    });
});
