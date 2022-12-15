import type { Validator, ValidatorFunction } from '../types';
declare const _default: (validator: Validator | ValidatorFunction, message: string) => {
    validate(value: any): Promise<import("../types").ValidationResults>;
};
export default _default;
