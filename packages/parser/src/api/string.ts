export default {
    parse(str: any) {
        if (str instanceof String) {
            return str;
        }
        return `${str}`;
    },
};
