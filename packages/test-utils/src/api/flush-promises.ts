import type { FlushPromisesOptions } from '../types';

export default async function({ interval }: FlushPromisesOptions = { interval: 0 }) {
    return new Promise(res => setTimeout(res, interval));
};