import { mount } from '@tybalt/test-utils';
import { describe, it } from '@jest/globals';

import Footer from './footer.component';

describe('footer', () => {
    it('should contain a license notice', async () => {
        const wrapper = await mount(Footer);

        const footer = wrapper.find('footer');

        expect(footer).toHaveLength(1);
        expect(footer.text()).toContain('Tybalt distributed under the MIT license');
    });
});
