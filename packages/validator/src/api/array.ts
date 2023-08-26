import validator from './validator';

export default () => {
    return validator(async (value?: any) => {
        if (Array.isArray(value)) {
            return true;
        }

        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed);
        } catch (e) { /* ignore */}

        return false;
        
    });
};
