declare module globalThis {
    var customElementsRegistry: Map<string, CustomElementConstructor>;
    var customElementsReverseRegistry: Map<CustomElementConstructor, string>;
}
