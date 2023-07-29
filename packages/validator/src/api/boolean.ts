import validator from './validator';

export default () => {
    return validator(async (value?: any) => {
        if (typeof value !== 'boolean') {
            return false;
        }
        if (value.toString().includes('.')) {
            return false;
        }
        return true;
    });
};
