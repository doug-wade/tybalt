import createContext from '../../src/api/create-context';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';
import { mount } from '@tybalt/test-utils';

describe('contexts', () => {
    it('passes contexts to setup', async () => {
        const name = 'context';
        const expected = 'hello world';

        const context = createContext(name);
        const component = defineComponent({
            name: 'passes-contexts-to-setup',
            contexts: { example: context },
            render({ example }) {
                return html`<p>${example}</p>`;
            }
        });
        const wrapper = await mount(component, {
            contexts: { 
                [name]: expected,
            }
        });

        expect(wrapper.html()).toContain(`<p>${expected}</p>`);
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

    it('is updateable', async () => {
        const name = 'context';
        const expected = 'hello world';

        const context = createContext(name);
        const component = defineComponent({
            name: 'context-not-rewrapped',
            contexts: { example: context },
            setup({ example }) {
                const clickHandler = () => {
                    example.update(expected);
                };

                return { 
                    clickHandler,
                    example, 
                };
            },
            render({ clickHandler, example }) {
                return html`
                    <p>${example}</p>
                    <button @click=${clickHandler}></button>
                `;
            }
        });
        const wrapper = await mount(component);
        wrapper.find('button').click();

        expect(wrapper.find('p').text()).toStrictEqual(expected);
    });
});
