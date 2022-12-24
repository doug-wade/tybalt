import type { ValidatorFunction, ValidationResults } from '../types';

export default (cb: ValidatorFunction) => {
    return {
        async validate(value?: any): Promise<ValidationResults> {
            const result = await cb(value);

            if (result === undefined || result === null || (typeof result === 'boolean' && result === true)) {
                return {
                    passed: true,
                };
            }

            if (typeof result === 'string') {
                return {
                    passed: false,
                    message: result,
                    level: 'error',
                };
            }

            if (typeof result === 'boolean') {
                return {
                    passed: result,
                    level: 'error',
                };
            }

            return result;
        },
    };
};
