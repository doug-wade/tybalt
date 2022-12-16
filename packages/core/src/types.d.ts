import type { Observable, SubscriberFunction } from 'core-js/proposals/observable'

export type PropType = String | Number | Object | Array<any>;

export type PropDefinition = {
    default?: any,
    validator?: Function
};

export type PropsDefinitionMap = {
    [Property: string]: PropDefinition
};

export type DefineComponentsOptions = { 
    name: string, 
    emits?: string[], 
    props?: PropsDefinitionMap, 
    setup?: (props: PropStateMap, context: { emit: (type: string, detail: any) => void }) => { [key: string]: Observable | Subscriber } | void,
    connectedCallback?: Function,
    disconnectedCallback?: Function,
    adoptedCallback?: Function,
    template?: string | Function,
    shadowMode?: "open" | "closed",
    css?: string | Function
};

export type useObservableOptions = {
    initialValue: any,
    subscriber?: SubscriberFunction
};

export type DefineExampleOptions = {
    attributes: Object, 
    controls: Object, 
    listeners: Object,
};

export type PropsStateMap = {
    [Property: string]: {
        handler: Function,
        observable: Observable
    }
};

export type SetupContext = {
    emit(type: string, detail: any): void
};

export type PropsStateItem = {
    observer: ZenObservable.SubscriptionObserver<unknown>,
    observable: Observable
};
