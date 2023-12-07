import type { HtmlTemplate } from "src/types";

export default (strings: TemplateStringsArray, ...keys: any[]): HtmlTemplate => {
    return { strings, keys };
};
