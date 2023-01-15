import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName }: ScaffoldContext) => {
    return `import { mount } from '@tybalt/test-utils';
import { compose, string, required } from '@tybalt/validator';
import HelloWorld from './hello-world';

describe('${pascalCaseName}', () => {
    it('renders', async () => {
        const mockName = 'World';
        const wrapper = await mount(${pascalCaseName}, { attributes: { name: mockName } });
        
        expect(wrapper.html()).toContain(\`Hello $\{mockName\}\`);
    });
});`;
};
