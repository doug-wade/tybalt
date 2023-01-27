import { Validator, ValidatorFunction } from '../types';
import ensureValidator from '../util/ensure-validator';
import validator from './validator';

const get = ({ value, key }: { value: any; key: string }) => {
    value ? value[key] : undefined;
};

export default (shape: { [property: string | symbol]: Validator | ValidatorFunction }) => {
    return validator(async (value?: any) => {
        if (!!value && typeof value !== 'object') {
            return { passed: false };
        }

        for (const [key, maybeValidator] of Object.entries(shape)) {
            const validator = ensureValidator(maybeValidator);
            const result = await validator.validate(get({ value, key }));

            if (!result.passed) {
                return result;
            }
        }

        return { passed: true };
    });
};
