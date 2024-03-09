import { Context, ContextEvent, UnknownContext } from "@tybalt/context";

const provideContext = <T extends (newVal: T) => void, U>({ elem, context, initialValue }: { elem: HTMLElement, context: Context<T>, initialValue: T }) => {
    const listeners: { (newVal: U): void }[] = [];
    let value = initialValue;
    elem.addEventListener('context-request', (event: ContextEvent<UnknownContext>) => {
        // Another context is being requested, and another listener will handle it
        if (event.context.name !== context.name) {
            return
        }

        // Propagation should be stopped in case the callback throws
        event.stopPropagation();

        let unsubscribe = () => {};
        if (event.subscribe) {
            const listener = (newValue: unknown) => { event.callback(newValue); };
            listeners.push(listener);

            unsubscribe = () => {
                for (let i = 0; i < listeners.length; i++) {
                    if (listeners[i] === listener) {
                        listeners[i] = () => {};
                    }
                }
            };
        }

        event.callback(value, unsubscribe);
    });

    const update = (newValue: T) => {
        value = newValue;

        listeners.forEach(listener => listener(value as any));
    };

    return {
        update
    };
}

export default provideContext;
