import { mount } from '@tybalt/test-utils';
import { describe, it } from '@jest/globals';

import Link from './link.component';

describe('link', () => {
    it('should pass through the href prop', async () => {
        const href = 'https://www.dougwade.io';

        const wrapper = await mount(Link, { attributes: { href } });

        const anchor = wrapper.find('a');

        expect(anchor.attributes('href')).toBe(href);
    });
});