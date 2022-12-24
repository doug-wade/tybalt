import type { ValidationResults, Validator } from '../types';

export default (results: ValidationResults): Validator => {
    return {
        async validate(value?: any) {
            return results;
        },
    };
};
