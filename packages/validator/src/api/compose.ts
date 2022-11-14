import type { LogLevel, Validator, ValidationResults } from '../types';

const levelNumbers = {
    "error": 4,
    "warn": 3,
    "info": 2,
    "debug": 1,
    "silent": 0
};

const isMoreSevere = (current?: LogLevel, previous?: LogLevel) => {
    if (!current) {
        return false;
    }

    if (!previous) {
        return true;
    }

    const currentLevel  = levelNumbers[current];
    const previousLevel = levelNumbers[previous];
    
    return currentLevel > previousLevel;
}

const getMostSevereLevel = (results: Array<ValidationResults>) => {
    let mostSevere: LogLevel | undefined = undefined;

    results.forEach(result => {
        if (isMoreSevere(result.level, mostSevere)) {
            mostSevere = result.level;
        }
    });

    return mostSevere;
}

const haveAllPassed = (results: Array<ValidationResults>) => {
    return results.reduce((accumulator, result) => { return result.passed && accumulator }, true);
}

const concatenateMessages = (results: Array<ValidationResults>) => {
    const concatenatedMessages = results.map(result => `  - (${result.level}) ${result.message}`).join('\n');
    if (concatenatedMessages.length) {
        return `Got validation failures:\n\n${concatenatedMessages}\n`;
    }
}

export default (...validators: Array<Validator>) => {
    return {
        async validate(value: any) {
            const promises = validators.map(validator => validator.validate(value));
            const results = await Promise.all(promises);

            const level = getMostSevereLevel(results);
            const message = concatenateMessages(results);
            const passed = haveAllPassed(results);

            return {
                level,
                message,
                passed
            };
        }
    }
};