import type { Validator } from '../types';
declare const _default: (...validators: Array<Validator>) => {
    validate(value: any): Promise<{
        level: undefined;
        message: string | undefined;
        passed: boolean;
    }>;
};
export default _default;
