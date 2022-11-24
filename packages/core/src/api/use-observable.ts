import Observable from 'zen-observable';

import type { useObservableOptions } from '../types';

export default async ({ initialValue, subscriber }: useObservableOptions) => {
    const { observer, observable }: { observer:  ZenObservable.SubscriptionObserver<unknown>, observable: Observable<unknown> } = await new Promise((res) => {
        console.log('instantiating new observable');
        const observable = new Observable((observer) => {
            console.log('foo');
            res({ observer, observable });
        });
    });

    if (subscriber) {
        observable.subscribe(subscriber);
    }

    if (initialValue) {
        observer.next(initialValue);
    }

    return { observer, observable };
};