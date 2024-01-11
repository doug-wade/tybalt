import { mount } from '@tybalt/test-utils';
import { describe, it } from '@jest/globals';

import Header from './header.component';

describe('footer', () => {
    it('should contain a header tag', async () => {
        const wrapper = await mount(Header);

        const header = wrapper.find('header');

        expect(header).toHaveLength(1);
    });

    it('should contain a link to the GitHub', async () => {
        const wrapper = await mount(Header);

        const link = wrapper.find('tybalt-link');

        expect(link).toHaveLength(1);
        expect(link.attributes('href')).toBe('https://github.com/doug-wade/tybalt');
    });
});
