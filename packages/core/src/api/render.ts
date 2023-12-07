import { HtmlTemplate } from "src/types";
import { v4 as uuid } from 'uuid';

const TYBALT_PLACEHOLDER_ATTRIBUTE = 'data-tybalt-placeholder';
const extractEventName = (str: string) => str.replace('@', '').split('=')[0];

export default ({ strings, keys }: HtmlTemplate, elem: HTMLElement) => {
    const placeholders = new Map<string, { listener: () => void; eventName: string }>();

    elem.innerHTML = strings.reduce((prev, curr, i) => {
        if (curr.includes('@')) {
            const [preAt, postAt] = curr.split('@');
            const eventName = extractEventName(postAt);
            const placeholder = uuid();
            placeholders.set(placeholder, { eventName, listener: keys[i] });

            return `${prev}${preAt}${TYBALT_PLACEHOLDER_ATTRIBUTE}="${placeholder}"`;
        }
        return `${prev}${curr}${keys[i] ? keys[i] : ''}`;
    }, '');

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