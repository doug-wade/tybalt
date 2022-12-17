import type { Observer } from 'rxjs';

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
    setup?: (props: PropStateMap, context: { emit: (type: string, detail: any) => void }) => { [key: string]: BehaviorSubject | string } | void,
    connectedCallback?: Function,
    disconnectedCallback?: Function,
    adoptedCallback?: Function,
    render?: Function,
    shadowMode?: "open" | "closed",
    css?: string | Function
};

export type UseObservableOptions = {
    initialValue?: any,
    subscriber?: SubscriptionObserver<any>
} | undefined;

export type UseObservableReturn = Promise<{ 
    observer: Observer<any>, 
    observable: Observable<any> 
}>;

export type DefineExampleOptions = {
    attributes: Object, 
    controls: Object, 
    listeners: Object,
};

export type SetupContext = {
    emit(type: string, detail: any): void
};

export type PropsStateItem = {
    observer: ZenObservable.SubscriptionObserver<unknown>,
    observable: Observable
};
