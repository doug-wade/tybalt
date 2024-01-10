
import type { Meta, StoryObj } from 'storybook-framework-tybalt';
import { html } from '@tybalt/core';

const meta: Meta = {
  component: 'tybalt-two',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`<tybalt-two></tybalt-two>`,
};

export const Primary: Story = {
  render: () => html`<tybalt-two prop="primary"></tybalt-two>`,
};

export const Secondary: Story = {
  render: () => html`<tybalt-two prop="secondary"></tybalt-two>`,
};

export const Tertiary: Story = {
  render: () => html`<tybalt-two prop="tertiary"></tybalt-two>`,
};
