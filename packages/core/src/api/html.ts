const toString = (key: any) => {
    if (key === null || key === undefined) {
        return '';
     }
     
     return key;
}

export default (strings: TemplateStringsArray, ...keys: any[]) => {
    return strings.reduce((prev, curr, i) => {
        return `${prev}${curr}${toString(keys[i])}`;
    }, '');
};
