import { ContextEvent, createContext } from "./index";

describe('createContext', () => {
    it('returns its arguments as an object', () => {
        const mockName = 'mock-context';
        const mockValue = 'foo';

        const actual = createContext(mockName, mockValue);

        expect(actual).toEqual({ name: mockName, initialValue: mockValue });
    });
})

describe('ContextEvent', () => {
    it('has a context and callback', () => {
        const mockCallback = jest.fn();
        const mockContext = createContext('mock-context', 'bar');

        const actual = new ContextEvent(mockContext, mockCallback);

        expect(actual.context).toEqual(mockContext);
        expect(actual.callback).toEqual(mockCallback);
    });
})