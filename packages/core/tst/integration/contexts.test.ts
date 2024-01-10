import defineComponent from '../../src/api/define-component';
import createContext from '../../src/api/create-context';
import { mount } from '@tybalt/test-utils';

describe('contexts', () => {
    it('passes contexts to setup', async () => {
        const mockContextName = 'context';
        const mockContextValue = 'hello world';
        const context = createContext(mockContextName, mockContextValue);

        let actual: any = {};
        const component = defineComponent({
            name: 'passes-contexts-to-setup',
            setup({ example }) {
                actual = example;
            },
            contexts: { example: context },
        });

        await mount(component);

        expect(actual.value).toStrictEqual(mockContextValue);
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

    it('is not re-wrapped during setup', async () => {
        const mockContextName = 'context';
        const mockContextValue = 'hello world';
        const context = createContext(mockContextName, mockContextValue);

        let actual: any = {};
        const component = defineComponent({
            name: 'context-not-rewrapped',
            render({ example }) {
                actual = example;
            },
            contexts: { example: context },
        });

        await mount(component);

        expect(actual.value).toStrictEqual(mockContextValue);
    });
});
