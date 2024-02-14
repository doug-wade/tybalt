import type { Context, ContextCallback, ContextEvent, ContextType, UnknownContext } from '../types';

class TybaltContextEvent<T> extends Event implements ContextEvent<T extends UnknownContext ? any : any> {
    #context: Context<unknown, T>;
    #callback: ContextCallback<ContextType<T extends UnknownContext ? any : any>>;
    #subscribe: boolean;

    constructor(
        context: Context<unknown, T>,
        callback: ContextCallback<ContextType<T extends UnknownContext ? any : any>>,
        options: {
            bubbles?: boolean;
            cancelBubble?: boolean;
            cancelable?: boolean;
            composed?: boolean;
            currentTarget?: EventTarget | null;
            defaultPrevented?: boolean;
            eventPhase?: number;
            isTrusted?: boolean;
            returnValue?: boolean;
            srcElement?: EventTarget | null;
            subscribe?: boolean;
            target?: EventTarget | null;
            timeStamp?: number;
            type?: string;
        } = {},
    ) {
        super('context-request');

        this.#context = context;
        this.#callback = callback;
        this.#subscribe = options?.subscribe || false;
    }

    get context() {
        return this.#context;
    }

    get callback() {
        return this.#callback;
    }

    get subscribe() {
        return this.#subscribe;
    }
}

export default TybaltContextEvent;
