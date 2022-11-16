import { defineExample } from '@gambit/core';
import Button, { BUTTON_TYPES } from './button.component';

export default {
  component: Button,
};

export const Primary = defineExample(Button, {
    attributes: {
        variant: BUTTON_TYPES.PRIMARY
    },
    controls: {
        variant: {
            type: 'select',
            options: Object.values(BUTTON_TYPES)
        }
    },
    listeners: {
        click() {
            console.log('primary button clicked!');
        }
    },
    slot: 'primary button'
});

export const Secondary = defineExample(Button, {
    attributes: {
        variant: BUTTON_TYPES.SECONDARY
    },
    controls: {
        variant: {
            type: 'select',
            options: Object.values(BUTTON_TYPES)
        }
    },
    listeners: {
        click() {
            console.log('secondary button clicked!');
        }
    },
    slot: 'secondary button'
});

export const Tertiary = defineExample(Button, {
    attributes: {
        variant: BUTTON_TYPES.TERTIARY
    },
    controls: {
        variant: {
            type: 'select',
            options: Object.values(BUTTON_TYPES)
        }
    },
    listeners: {
        click() {
            console.log('tertiary button clicked!');
        }
    },
    slot: 'tertiary button'
});