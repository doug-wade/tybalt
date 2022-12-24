import validator from './validator';

export default (pattern: RegExp | string) => {
    return validator(async (value?: any) => {
        if (typeof pattern === 'string') {
            return value.includes(pattern);
        } else {
            return pattern.test(value);
        }
    });
};
