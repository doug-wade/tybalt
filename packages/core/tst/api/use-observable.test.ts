import useObservable from '../../src/api/use-observable';

describe('use-observable', () => {
    it.skip('returns an observable and handler', async () => {
        const { observer, observable } = await useObservable({ initialValue: 1 });

        expect(typeof observer === 'function').toBeTruthy();
        expect(typeof observable.subscribe === 'function').toBeTruthy();
    });
});