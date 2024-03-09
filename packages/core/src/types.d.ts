import type { Parser } from '@tybalt/parser';
import type { Validator } from '@tybalt/validator';
import type { Reactive } from '@tybalt/reactive';

export type PropType = string | number | object | Array<any>;

export type PropDefinition = {
    default?: any;
    validator?: Validator;
    parser?: Parser;
};

export type PropsDefinitionMap = {
    [Property: string]: PropDefinition;
};

export type RenderContext = { [key: string]: Reactive | string };

export type PropsStateMap = { [key: string]: Map };

export type HtmlTemplate = {
    strings: TemplateStringsArray;
    keys: any[];
};

export type DefineComponentsOptions = {
    name: string;
    emits?: string[];
    props?: PropsDefinitionMap;
    setup?: (props: PropStateMap, context: { emit: (type: string, detail: any) => void }) => RenderContext | void;
    connectedCallback?: () => void;
    disconnectedCallback?: () => void;
    adoptedCallback?: () => void;
    render?: (RenderContext) => HtmlTemplate | void;
    shadowMode?: 'open' | 'closed';
    css?: string | ((RenderContext) => string);
    template?: string;
    contexts?: { [key: string]: Context };
};

export type SetupContext = {
    emit(type: string, detail?: any): void;
};
