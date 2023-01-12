import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName }: ScaffoldContext) => {
    return `
        import { mount } from '@tybalt/test-utils';
        import { compose, string, required } from '@tybalt/validator';

        describe('${pascalCaseName}', () => {
            it('renders', () => {
                const mockName = 'World';
                const wrapper = mount(${pascalCaseName}, { attributes: { name: mockName } });
                
                expect(wrapper.text()).toBe(\`Hello $\{mockName\}\`);
            });
        });
    `;
};
