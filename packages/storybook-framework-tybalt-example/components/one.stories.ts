
import type { Meta, StoryObj } from 'storybook-framework-tybalt';

import { html } from '@tybalt/core';

const meta: Meta = {
  component: 'tybalt-one',
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => html`<tybalt-one prop="primary"></tybalt-one>`,
};

export const Secondary: Story = {
    render: () => html`<tybalt-one prop="secondary"></tybalt-one>`,
  };
