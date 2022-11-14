import {describe, expect, it, jest} from '@jest/globals';
import flushPromises from '../../src/api/flush-promises';

describe('flush-promises', () => {
    it('calls setTimeout', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
        const mockInterval = 69;

        flushPromises({ interval: mockInterval });

        expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), mockInterval);
    });
});