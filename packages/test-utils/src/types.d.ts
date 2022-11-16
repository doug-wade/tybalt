export type AttributeObject = Object<string, number | string>;

type DOMTokenListOrBoolean<T> = T extends string ? boolean | null : DOMTokenList;
type NamedNodeMapOrString<T> = T extends string ? string | null | never : NamedNodeMap;

export interface Wrapper {
    find(selector: string): Wrapper | never;
    findAll(selector: string): Wrapper | never;
    findComponent(definition: CustomElementConstructor): Wrapper | never;
    findComponentAll(definition: CustomElementConstructor): Wrapper | never;
    html(): string | never;
    text(): string | null | never;
    attributes(attributeName?: T): NamedNodeMapOrString<T>;
    classes(className?: T): DOMTokenListOrBoolean<T>;
    exists(): boolean;
    trigger(type: string, payload?: any): void;
};

export type MountOptions = { 
    attributes?: AttributeObject, 
    slot?: string 
};

export type FlushPromisesOptions = {
    interval?: number
};
