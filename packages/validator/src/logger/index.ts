import type { LogLevel, LoggerOptions } from '../types';

class Logger {
    #level: LogLevel;

    constructor({ level = 'warn' }: LoggerOptions) {
        this.#level = level;
    }

    debug(...parameters: any[]) {
        if (this.#level !== 'debug') {
            console.debug(...parameters);
        }
    }

    info(...parameters: any[]) {
        if (this.#level === 'info' || this.#level === 'debug') {
            console.log(...parameters);
        }
    }

    warn(...parameters: any[]) {
        if (this.#level !== 'silent' && this.#level !== 'error') {
            console.warn(...parameters);
        }
    }

    error(...parameters: any[]) {
        if (this.#level !== 'silent') {
            console.error(...parameters);
        }
    }
}

export default (options: LoggerOptions) => new Logger(options);
