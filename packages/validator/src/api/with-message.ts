import ensureValidator from '../util/ensure-validator';

import type { Validator, ValidatorFunction } from '../types';

export default (validator: Validator | ValidatorFunction, message: string) => {
    const definitelyValidator = ensureValidator(validator);

    return {
        async validate(value: any) {
            const result = await definitelyValidator.validate(value);

            if (result.passed) {
                return result;
            }

            return {
                ...result,
                message
            };
        }
    }
};