import type { Validator, LogLevel } from '../types'

export default (validator: Validator, level: LogLevel) => {
    return {
        async validate(value?: any) {
            const result = await validator.validate(value);

            return {
                ...result,
                level
            };
        }
    };
}