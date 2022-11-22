import 'core-js/proposals/observable';

import type { useObservableOptions } from '../types';

const isFunction = (x: Function | undefined): x is Function => typeof x === 'function';

export default ({ initialValue, subscriber }: useObservableOptions) => {
    let handler = (event: any): void => {};

    const observable = new Observable((observer: any) => {
        handler = (event: any) => { 
            return observer.next(event);
        };
    });

    if (subscriber) {
        observable.subscribe(subscriber);
    }

    if (initialValue) {
        if (isFunction(handler)) {
            handler(initialValue);
        }
    }

    return { handler, observable };
};