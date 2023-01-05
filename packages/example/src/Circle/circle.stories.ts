import { html } from '@tybalt/core';

import './circle.component';

export default {
  title: 'Circle',
};

// 👇 We create a “template” of how args map to rendering
const Template = () => html`<example-circle></example-circle>`;

export const Default = Template.bind({});

Default.args = {};