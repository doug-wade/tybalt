import { HtmlTemplate } from "src/types";
import { v4 as uuid } from 'uuid';

const TYBALT_PLACEHOLDER_ATTRIBUTE = 'data-tybalt-placeholder';
const EVENT_LISTENER_REGEX = /\s+@\w+="/;
const extractEventName = (str: string) => str.replace('@', '').split('=')[0];

let skip = false;

const renderToString = ({ strings, keys }: HtmlTemplate, placeholders: Map<string, { listener: () => void; eventName: string }>): string => {
    return strings.reduce((prev, current, i) => {
        let curr = current;
        if (skip) {
            curr = current.replace(' ', '');
            skip = false;
        }

        if (keys[i] === undefined || keys[i] === null) {
            return `${prev}${curr}`;
        } else if (EVENT_LISTENER_REGEX.test(curr)) {
            const [preAt, postAt] = curr.split('@');
            const eventName = extractEventName(postAt);
            const placeholder = uuid();

            placeholders.set(placeholder, { eventName, listener: keys[i] });
            skip = true;

            return `${prev}${preAt}${TYBALT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true`;
        } else if (Array.isArray(keys[i])) {
            const children = keys[i].map((key: HtmlTemplate) => renderToString(key, placeholders)).join('');
            return `${prev}${curr}${children}`;
        } else if (keys[i]?.strings && keys[i]?.keys) {
            return `${prev}${curr}${renderToString(keys[i], placeholders)}`;
        }

        return `${prev}${curr}${keys[i]}`;
    }, '');
}

export default (template: HtmlTemplate): HTMLCollection => {
    const mountPoint = document.createElement('div');
    const placeholders = new Map<string, { listener: () => void; eventName: string }>();

    mountPoint.innerHTML = renderToString(template, placeholders);

    for (const [placeholder, { listener, eventName }] of placeholders.entries()) {
        const selector = `[${TYBALT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"]`
        const placeheld = mountPoint.querySelector(selector);

        if (placeheld === null) {
            console.warn(`expected to find element with placeholder ${placeholder}`);
            continue;
        }

        placeheld.addEventListener(eventName, listener);
        placeheld.removeAttribute(`${TYBALT_PLACEHOLDER_ATTRIBUTE}-${placeholder}`);
    }

    return mountPoint.children;
}