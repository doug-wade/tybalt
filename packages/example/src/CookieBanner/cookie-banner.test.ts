import { mount } from '@tybalt/test-utils';
import CookieBanner from './cookie-banner.component';

const mountCookieBanner = async () => {
    const wrapper = await mount(CookieBanner);

    return wrapper;
}

describe('cookie banner', () => {
    it('renders a link', async () => {
        const wrapper = await mountCookieBanner();
        
        const actual = wrapper.find('example-link');

        expect(actual.attributes('href')).toBe('http://www.example.com');
    });

    it.skip('emits a click event when the button is clicked', async () => {
        const wrapper = await mountCookieBanner();

        const actual = wrapper.find('button');
        actual.trigger('click');

        // TODO: Enable as part of #64
        // expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('has a primary button', async () => {
        const wrapper = await mountCookieBanner();

        const actual = wrapper.find('example-button');

        expect(actual.attributes('variant')).toBe('primary');
    });
});