import type { Context, ContextCallback, ContextEvent, ContextType, UnknownContext } from '../types';

class TybaltContextEvent<T> extends Event implements ContextEvent<T extends UnknownContext ? any : any> {
    #context: Context<T>;
    #callback: ContextCallback<ContextType<T extends UnknownContext ? any : any>>;
    #subscribe: boolean;
    #event: CustomEvent;

    constructor(
        context: Context<T>,
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
        },
    ) {
        super('context-request');

        this.#context = context;
        this.#callback = callback;
        this.#subscribe = options?.subscribe || false;
        this.#event = new CustomEvent('context-request', options);
    }

    NONE: 0 = 0 as const;
    CAPTURING_PHASE = 1 as const;
    AT_TARGET: 2 = 2 as const;
    BUBBLING_PHASE: 3 = 3 as const;

    get bubbles() {
        return this.#event.bubbles;
    }

    // deprecated
    get cancelBubble() {
        return this.#event.cancelBubble;
    }

    get cancelable() {
        return this.#event.cancelable;
    }

    get composed() {
        return this.#event.bubbles;
    }

    get currentTarget() {
        return this.#event.currentTarget;
    }

    get defaultPrevented() {
        return this.#event.defaultPrevented;
    }

    get eventPhase() {
        return this.#event.eventPhase;
    }

    get isTrusted() {
        return this.#event.isTrusted;
    }

    get returnValue() {
        return this.#event.returnValue;
    }

    get srcElement() {
        return this.#event.srcElement;
    }
    get target() {
        return this.#event.target;
    }
    get timeStamp() {
        return this.#event.timeStamp;
    }
    get type() {
        return this.#event.type;
    }

    composedPath(): EventTarget[] {
        throw new Error('Method not implemented.');
    }

    initEvent(): void {
        throw new Error('Method not implemented.');
    }

    preventDefault(): void {
        throw new Error('Method not implemented.');
    }

    stopImmediatePropagation(): void {
        throw new Error('Method not implemented.');
    }

    stopPropagation(): void {
        throw new Error('Method not implemented.');
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
