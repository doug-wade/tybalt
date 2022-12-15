import type { LoggerOptions } from '../types';
declare class Logger {
    #private;
    constructor({ level }: LoggerOptions);
    debug(...parameters: any[]): void;
    info(...parameters: any[]): void;
    warn(...parameters: any[]): void;
    error(...parameters: any[]): void;
}
declare const _default: (options: LoggerOptions) => Logger;
export default _default;
