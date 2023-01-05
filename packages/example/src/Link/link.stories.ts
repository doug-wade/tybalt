import { html } from '@tybalt/core';

import './link.component';

export default {
  title: 'Link',
};

// 👇 We create a “template” of how args map to rendering
const Template = ({ href }) => html`<example-link href=${href}></example-link>`;

export const Default = Template.bind({});

Default.args = {
  href: 'http://doug-wade.github.io/tybalt'
};
