import { Context, ContextEvent } from "src/types";

const provideContext = <T, U>({ elem, context, initialValue }: { elem: HTMLElement, context: Context<T, U>, initialValue: U }) => {
    const listeners: { (newVal: U): void }[] = [];
    let value = initialValue;
    elem.addEventListener('context-request', (event: ContextEvent<Context<T, U>>) => {
        if (event.context !== context) {
            return
        }

        // Propogation should be stopped already in case the callback throws
        event.stopPropagation();

        let listener: { (newVal: U): void };
        let unsubscribe = () => {};
        if (event.subscribe) {
            listener = (newValue: U) => { event.callback(newValue); };
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

    const update = (newValue: U) => {
        value = newValue;

        listeners.forEach(listener => {
            listener(value);
        });
    };

    return {
        update
    };
}

export default provideContext;
