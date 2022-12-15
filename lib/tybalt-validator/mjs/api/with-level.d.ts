import type { Validator, LogLevel } from '../types';
declare const _default: (validator: Validator, level: LogLevel) => {
    validate(value?: any): Promise<{
        level: LogLevel;
        message?: string | undefined;
        passed: boolean;
    }>;
};
export default _default;
