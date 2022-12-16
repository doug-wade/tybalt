export default (strings: TemplateStringsArray, ...keys: any[]) => {
    return strings.reduce((prev, curr, i) => {
        return `${prev}${curr}${keys[i] ? keys[i] : ''}`;
    }, '');
};