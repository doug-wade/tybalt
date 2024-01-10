export default {
    parse(str: any) {
        if (str === undefined || str === 'undefined') {
            return undefined;
        }

        if (str === null || str === 'null') {
            return null;
        }

        if (str === 'true' || str === true) {
            return true;
        }

        if (str === 'false' || str === false) {
            return false;
        }

        if (Array.isArray(str) || typeof str === 'object') {
            return str;
        }

        if (str[0] === '{' || str[0] === '[') {
            try {
                return JSON.parse(str);
            } catch (e) {
                /* ignore */
            }
        }

        try {
            const parsed = Number(str);
            if (!Number.isNaN(parsed)) {
                return parsed;
            }
        } catch (e) {
            /* ignore */
        }

        return str;
    },
};
