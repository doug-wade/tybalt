const originalDefine = global.customElements.define;
const originalAttachShadow = HTMLElement.prototype.attachShadow;

global.shadowRootRegistry = new Map<HTMLElement, ShadowRoot>();
global.customElementsRegistry = new Map<string, CustomElementConstructor>();
global.customElementsReverseRegistry = new Map<CustomElementConstructor, string>();

HTMLElement.prototype.attachShadow = function (options) {
    const shadowRoot = originalAttachShadow.apply(this, [options]);
    global.shadowRootRegistry.set(this, shadowRoot);
    return shadowRoot;
};

global.customElements.define = (name, constructor, options) => {
    global.customElementsRegistry.set(name, constructor);
    global.customElementsReverseRegistry.set(constructor, name);
    originalDefine.apply(global.customElements, [name, constructor, options]);
};
