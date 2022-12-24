import ValidationError from '../util/validation-error';

import type { Validator } from '../types';

const DEFAULT_MESSAGE = 'A validator with no associated message failed.';

export default (validator: Validator) => {
    return {
        async validate(value?: any) {
            const result = await validator.validate(value);

            if (result.passed) {
                return;
            }

            if ('level' in result && result.level === 'error') {
                throw new ValidationError(result.message || DEFAULT_MESSAGE);
            }
        },
    };
};
