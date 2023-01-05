import { html } from '@tybalt/core';

import { BUTTON_VARIANTS } from './button.component';

export default {
  title: 'Button',
};

// 👇 We create a “template” of how args map to rendering
const Template = ({ variant }) => html`<example-button variant=${variant}></example-button>`;

export const Primary = Template.bind({});

Primary.args = {
  variant: BUTTON_VARIANTS.PRIMARY
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: BUTTON_VARIANTS.SECONDARY
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  variant: BUTTON_VARIANTS.TERTIARY
};