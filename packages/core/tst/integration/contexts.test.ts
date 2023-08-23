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
            setup({ context }) {
                console.log('context:', context);
                actual = context;
            },
            contexts: { context },
        });

        await mount(component);

        console.log('actual:', actual);

        expect(actual.name).toStrictEqual(mockContextName);
        expect(actual.initialValue).toStrictEqual(mockContextValue);
    });

    it('throws an error if there is a collision', async () => {
        const context = createContext('bmo mochi');
        expect(() => {
            defineComponent({
                name: 'passes-contexts-to-setup',
                props: {
                    example: { default: 'hello world' }
                },
                contexts: { example: context },
            });
        }).toThrow('Collision detected between context and prop: example')
    });
});