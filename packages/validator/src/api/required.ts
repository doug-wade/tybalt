import validator from './validator';

export default () => {
    return validator(async (value?: any) => {
        return !!value;
    });
};
