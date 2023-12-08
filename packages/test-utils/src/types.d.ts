export type AttributeObject = NonNullable<string, number | string>;

type DOMTokenListOrBoolean<T> = T extends string ? boolean | null : Array<string>;
type NamedNodeMapOrString<T> = T extends string ? string | null | never : NonNullable<unknown>;

export interface Wrapper {
    length: number;
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
    setAttribute(name: string, value?: any): void;
    emitted(eventName?: string): Array<Event>;
}

export type MountOptions = {
    attributes?: AttributeObject;
    slot?: string;
};

export type FlushPromisesOptions = {
    interval?: number;
};
