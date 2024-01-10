import reactive from '../../src/api/reactive';

describe('reactive', () => {
    it('should support the default constructor', () => {
        const underTest = reactive();

        expect(underTest.value).toBeUndefined();
    });

    it('should take an initial value', () => {
        const value = 42;

        const underTest = reactive(value);

        expect(underTest.value).toBeTruthy();
    });

    it('should support an empty array', () => {
        const value = [];

        const underTest = reactive([]);

        expect(underTest.value).toStrictEqual(value);
    });

    it('should notify initial listeners', () => {
        const value = 'test value';
        const listenerSpy = jest.fn();

        const underTest = reactive('not used', [listenerSpy]);
        underTest.value = value;

        expect(underTest.value).toBe(value);
        expect(listenerSpy).toHaveBeenCalledTimes(1);
        expect(listenerSpy).toHaveBeenCalledWith(value);
    });

    it('should notify later listeners', () => {
        const value = 'test value';
        const listenerSpy = jest.fn();

        const underTest = reactive('not used');
        underTest.addListener(listenerSpy);
        underTest.value = value;

        expect(underTest.value).toBe(value);
        expect(listenerSpy).toHaveBeenCalledTimes(1);
        expect(listenerSpy).toHaveBeenCalledWith(value);
    });
});
