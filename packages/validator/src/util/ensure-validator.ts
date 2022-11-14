import validator from '../api/validator';

import type { Validator, ValidatorFunction } from '../types'

const isValidatorFunction = (x: Validator | ValidatorFunction): x is ValidatorFunction => typeof x === 'function';

export default (maybeValidator: Validator | ValidatorFunction): Validator => {
    if (isValidatorFunction(maybeValidator)) {
        return validator(maybeValidator);
    } else {
        return maybeValidator;
    }
}