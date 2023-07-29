/* eslint-disable no-var */

declare module globalThis {
    var customElementsRegistry: Map<string, CustomElementConstructor>;
    var customElementsReverseRegistry: Map<CustomElementConstructor, string>;
    var shadowRootRegistry: Map<Element, ShadowRoot>;
}
