import type { Reactive } from '../types';

function reactive<T>(initialValue?: any, listeners: Array<(newState: object) => void> = []): Reactive<T> {
    const state = { 
        value: initialValue, 
        addListener(listener: () => void) { 
            listeners.push(listener) 
        },
        isForcingRerenderOnUpdate: false,
    };

    const handler = {
        get(target: any, prop: string) {
            if (prop === 'value') {
                return state.value;
            } else if (prop === 'addListener') {
                return state.addListener;
            } else if (prop === 'isForcingRerenderOnUpdate') {
                return state.isForcingRerenderOnUpdate;
            } else if (typeof state.value === 'string' || typeof state.value === 'number') {
                return state;
            } else if (state.value) {
                return Reflect.get(state.value, prop);
            } else {
                return undefined;
            }
        },
        set(obj: any, prop: string, value: any) {
            if (prop === 'value') {
                state.value = value;

                try {
                    listeners.forEach(listener => listener(value));
                } catch (e) {
                    console.error(e);
                    return false;
                }

                return true;
            } else {
                return Reflect.set(obj, prop, value);
            }
        }
    };
    
    return new Proxy(state, handler);
}

export default reactive;
