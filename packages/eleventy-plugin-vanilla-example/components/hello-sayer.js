class HelloSayer extends HTMLElement {
    #shadowRoot;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('name') || '';

        const elem = document.createElement('div');
        elem.innerHTML = `Hello ${name}!`;

        this.#shadowRoot.appendChild(elem);
    }
}

customElements.define('hello-sayer', HelloSayer);

export default HelloSayer;
