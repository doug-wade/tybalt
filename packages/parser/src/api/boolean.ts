export default {
    parse(str: any) {
        if (str === 'true') {
            return true;
        }
        if (str === 'false') {
            return false;
        }
        return null;
    },
};
