import reactive from '../../src/api/reactive';
import derive from '../../src/api/derive';

describe('reactive', () => {
    it('should support a single derivation for numbers', () => {
        const value = 42;
        const summand = 17;
        const mockReactive = reactive(value);

        const derivation = derive(mockReactive, ([value]) => {
            return value + summand;
        });

        expect(derivation.value).toBe(value + summand);
    });

    it('should support a multiple derivation for strings', () => {
        const value = 'first half';
        const anotherValue = 'second half';
        const mockReactive = reactive(value);
        const anotherReactive = reactive(anotherValue);

        const derivation = derive([mockReactive, anotherReactive], ([firstReactive, secondReactive]) => {
            return `${firstReactive}${secondReactive}`;
        });

        expect(derivation.value).toBe(`${value}${anotherValue}`);
    });

    it('should update after changes take place', () => {
        const value = 'updated';
        const base = 'base';
        const mockReactive = reactive();

        const derivation = derive(mockReactive, (toDerive) => `${toDerive[0]}${base}`);
        mockReactive.value = value;

        expect(derivation.value).toBe(`${value}${base}`);
    });

    it('should take wrapped reactives', () => {
        const value = 'hi there';
        const mockReactive = { reactive: reactive(value) };

        const derivation = derive(mockReactive, ([toDerive]) => `${toDerive}`);

        expect(derivation.value).toBe(value);
    });
});
