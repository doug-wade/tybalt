const originalDefine = global.customElements.define;

global.customElementsRegistry = new Map<string, CustomElementConstructor>();
global.customElementsReverseRegistry = new Map<CustomElementConstructor, string>();

global.customElements.define = (name, constructor, options) => {
    global.customElementsRegistry.set(name, constructor);
    global.customElementsReverseRegistry.set(constructor, name);
    originalDefine.apply(global.customElements, [name, constructor, options]);
};
