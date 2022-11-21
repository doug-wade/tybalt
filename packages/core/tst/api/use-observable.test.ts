import useObservable from '../../src/api/use-observable';

describe('use-observable', () => {
    it('returns an observable and handler', () => {
        const { handler, observable } = useObservable({ initialValue: 1 });

        expect(typeof handler === 'function').toBeTruthy();
        expect(typeof observable.subscribe === 'function').toBeTruthy();
    });
});