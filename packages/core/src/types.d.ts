import type { Observable, SubscriberFunction } from 'core-js/proposals/observable'

export type PropType = String | Number | Object | Array<any>;

export type PropDefinition = {
    name: string,
    validator?: Function
};

export type DefineComponentsOptions = { 
    name: string, 
    emits?: string[], 
    props?: Object, 
    setup?: (props: PropStateMap, context: { emit: (type: string, detail: any) => void }) => { [key: string]: Observable | Subscriber } | undefined,
    connectedCallback?: () => void,
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

export type PropsStateItem = {
    observer: ZenObservable.SubscriptionObserver<unknown>,
    observable: Observable
};

export type PropsStateMap = {
    [Property: string]: PropsStateItem
};

export type SetupContext = {
    emit(type: string, detail: any): void
};
