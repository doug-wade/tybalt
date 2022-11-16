import { Observable } from 'core-js';

import type { useObservableOptions } from '../types';

const isFunction = (x: Function | undefined | never): x is Function => typeof x === 'function';

export default ({ initialValue, subscriber }: useObservableOptions) => {
    let handler;

    const observer = new Observable((observer) => {
        handler = (event) => { 
            return observer.next(event) 
        };
    });

    if (subscriber) {
        observer.subscribe(subscriber);
    }

    if (initialValue) {
        if (isFunction(handler)) {
            handler(initialValue);
        }
    }

    return { handler, observer };
};