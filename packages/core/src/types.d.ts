import type { Observer } from 'rxjs';
import type { Parser } from '@tybalt/parser';
import type { Validator } from '@tybalt/validator';

export type PropType = string | number | object | Array<any>;

export type PropDefinition = {
    default?: any;
    validator?: Validator;
    parser?: Parser;
};

export type PropsDefinitionMap = {
    [Property: string]: PropDefinition;
};

export type RenderContext = { [key: string]: BehaviorSubject | string };

export type PropsStateMap = { [key: string]: Map };

export type DefineComponentsOptions = {
    name: string;
    emits?: string[];
    props?: PropsDefinitionMap;
    setup?: (props: PropStateMap, context: { emit: (type: string, detail: any) => void }) => RenderContext | void;
    connectedCallback?: () => void;
    disconnectedCallback?: () => void;
    adoptedCallback?: () => void;
    render?: (RenderContext) => string;
    shadowMode?: 'open' | 'closed';
    css?: string | ((RenderContext) => string);
    template?: string;
    contexts?: { [key: string]: Context };
};

export type UseObservableOptions =
    | {
          initialValue?: any;
          subscriber?: SubscriptionObserver<any>;
      }
    | undefined;

export type UseObservableReturn = Promise<{
    observer: Observer<any>;
    observable: Observable<any>;
}>;

export type SetupContext = {
    emit(type: string, detail: any): void;
};

// https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md
/**
 * A Context object defines an optional initial value for a Context, as well as a name identifier for debugging purposes.
 */
export type Context<T> = {
    name: string;
    initialValue?: T;
};

/**
 * An unknown context type
 */
export type UnknownContext = Context<unknown>;

/**
 * A helper type which can extract a Context value type from a Context type
 */
export type ContextType<T extends UnknownContext> = T extends Context<infer Y> ? Y : never;

/**
 * A callback which is provided by a context requester and is called with the value satisfying the request.
 * This callback can be called multiple times by context providers as the requested value is changed.
 */
export type ContextCallback<ValueType> = (value: ValueType, unsubscribe?: () => void) => void;

/**
 * An event fired by a context requester to signal it desires a named context.
 *
 * A provider should inspect the `context` property of the event to determine if it has a value that can
 * satisfy the request, calling the `callback` with the requested value if so.
 *
 * If the requested context event contains a truthy `subscribe` value, then a provider can call the callback
 * multiple times if the value is changed, if this is the case the provider should pass an `unsubscribe`
 * function to the callback which requesters can invoke to indicate they no longer wish to receive these updates.
 */
export class ContextEvent<T extends UnknownContext> extends Event {
    public constructor(
        public readonly context: T,
        public readonly callback: ContextCallback<ContextType<T>>,
        public readonly subscribe?: boolean,
    ) {
        super('context-request', { bubbles: true, composed: true });
    }
}

declare global {
    interface HTMLElementEventMap {
        /**
         * A 'context-request' event can be emitted by any element which desires
         * a context value to be injected by an external provider.
         */
        'context-request': ContextEvent<UnknownContext>;
    }
}
