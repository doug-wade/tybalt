import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('example-button')
export class Button extends LitElement {
    constructor() {
        super();
        this.ariaLabel = '';
    }

    @property({ attribute: 'aria-label' })
    ariaLabel: string;

    render() {
        return html`<button class="example-button" aria-label="${this.ariaLabel}"><slot></slot></button>`;
    }
}
