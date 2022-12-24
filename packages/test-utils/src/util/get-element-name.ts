export default ({ definition }: { definition: CustomElementConstructor }) => {
    const elementName = global.customElementsReverseRegistry.get(definition);

    if (!elementName) {
        throw new Error(`Web component ${definition.name} was not registered with customElements.define()`);
    }

    return elementName;
};
