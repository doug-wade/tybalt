import type { Reactive } from '@tybalt/reactive';

export default function forceRerenderOnUpdate<T>(reactive: Reactive<T>): Reactive<T> {
    reactive.isForcingRerenderOnUpdate = true;

    return reactive;
}
