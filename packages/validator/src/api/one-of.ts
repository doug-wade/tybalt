import validator from './validator';

export default (values: Array<any>) => {
    return validator(async (value?: any) => {
        return values.includes(value);
    });
};