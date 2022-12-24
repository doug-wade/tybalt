export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export type LoggerOptions = {
    level: LogLevel;
};
export type ValidationResults = {
    level?: LogLevel;
    message?: string;
    passed: boolean;
};
export type Validator = {
    validate: (value: any) => Promise<ValidationResults>;
};
export type ValidatorFunction = (value?: any) => Promise<boolean | string | ValidationResults | null | undefined>;
