import type { Context } from '../types';

export default function createContext<T>(name: string, initialValue?: T): Readonly<Context<T>> {
    return {
        name,
        initialValue,
    };
}
