import { HtmlTemplate } from "src/types";
import { v4 as uuid } from 'uuid';

const TYBALT_PLACEHOLDER_ATTRIBUTE = 'data-tybalt-placeholder';
const EVENT_LISTENER_REGEX = /\s+@\w+="/;
const extractEventName = (str: string) => str.replace('@', '').split('=')[0];

const renderToString = ({ strings, keys }: HtmlTemplate, placeholders: Map<string, { listener: () => void; eventName: string }>): string => {
    return strings.reduce((prev, curr, i) => {
        if (EVENT_LISTENER_REGEX.test(curr)) {
            const [preAt, postAt] = curr.split('@');
            const eventName = extractEventName(postAt);
            const placeholder = uuid();

            placeholders.set(placeholder, { eventName, listener: keys[i] });

            return `${prev}${preAt}${TYBALT_PLACEHOLDER_ATTRIBUTE}="${placeholder}"`;
        } else if (Array.isArray(keys[i])) {
            return `${prev}${curr}${keys[i].map((key: HtmlTemplate) => renderToString(key, placeholders)).join('')}`;
        } else if (keys[i]?.strings && keys[i]?.keys) {
            return `${prev}${curr}${renderToString(keys[i], placeholders)}`;
        }

        return `${prev}${curr}${keys[i] ? keys[i] : ''}`;
    }, '');
}

export default (template: HtmlTemplate, elem: HTMLElement) => {
    const placeholders = new Map<string, { listener: () => void; eventName: string }>();

    elem.innerHTML = renderToString(template, placeholders);

    for (const [placeholder, { listener, eventName }] of placeholders.entries()) {
        const placeheld = elem.querySelector(`[${TYBALT_PLACEHOLDER_ATTRIBUTE}="${placeholder}"]`);

        if (placeheld === null) {
            console.warn(`expected to find element with placeholder ${placeholder}`);
            continue;
        }

        placeheld.addEventListener(eventName, listener);
        placeheld.removeAttribute(TYBALT_PLACEHOLDER_ATTRIBUTE);
    }
}