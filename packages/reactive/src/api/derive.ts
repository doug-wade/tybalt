import reactive from './reactive';
import type { Reactive } from '../types';

function isReactiveContainer(
    candidate: Reactive<any> | { reactive: Reactive<any> },
): candidate is { reactive: Reactive<any> } {
    return (candidate as { reactive: Reactive<any> }).reactive !== undefined;
}

function derive(
    from: Reactive<any> | Reactive<any>[] | { reactive: Reactive<any> } = [],
    mapper: (arg0: any) => any,
): Reactive<unknown> {
    let fromArray: Reactive<any>[];
    if (Array.isArray(from)) {
        fromArray = from;
    } else if (isReactiveContainer(from)) {
        fromArray = [from.reactive];
    } else {
        fromArray = [from];
    }

    const initialValue = mapper(fromArray.map((v) => v.value));
    const derivedReactive = reactive(initialValue);

    const listener = () => {
        const newState = mapper(fromArray.map((v) => v.value));
        derivedReactive.value = newState;
    };

    fromArray.forEach((source) => {
        source.addListener(listener);
    });

    return derivedReactive;
}

export default derive;
