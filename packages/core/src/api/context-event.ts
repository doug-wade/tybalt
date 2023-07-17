import type { Context, ContextEvent, UnknownContext } from '../types';

class TybaltContextEvent<T> extends ContextEvent<T extends UnknownContext> {
    #context: Context<T>;
    #callback: Function;
    #subscribe: boolean;

    constructor(context: Context<T>, callback: Function, subscribe: boolean) {
        this.#context = context;
        this.#callback = callback;
        this.#subscribe = subscribe;
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
