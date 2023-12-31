import { HtmlTemplate } from "src/types";
import { v4 as uuid } from 'uuid';

import type { Reactive } from "@tybalt/reactive";

import forceRerenderOnUpdate from "./force-rerender-on-update";

const TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE = 'data-tybalt-event-placeholder';
const TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE = 'data-tybalt-set-attribute-placeholder';

// hey remember the one about parsing html with regex?
// it's way better when you do it with html _fragments_, right?
// https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
const EVENT_LISTENER_REGEX = /\s+@\w+="/;
const HTML_ATTRIBUTE_REGEX = /\s+(\w|-)+="[^"]*$/;
const extractEventName = (str: string) => str.replace('@', '').split('=')[0];

let prevAttribute = false;

const renderToString = (
    { strings, keys }: HtmlTemplate, 
    eventPlaceholders: Map<string, { listener: () => void; eventName: string }>,
    setAttributePlaceholders: Map<string, { reactive: Reactive<any>; attributeName: string, prefix: string, suffix: string }>
): string => {
    return strings.reduce((prev, current, i) => {
        let curr = current;
        const key = keys[i];

        if (prevAttribute) {
            const temp = curr.split('"');
            temp.shift();
            curr = temp.join('"');
            prevAttribute = false;
        }

        // Is this a bug? Does this ever result in us leaving `<my-component my-attribute>`, 
        // indicating truthiness rather than falsiness?Q
        if (key === undefined || key === null) {
            return `${prev}${curr}`;
        }

        // my-attribute="my-${value}"
        if (HTML_ATTRIBUTE_REGEX.test(curr) && typeof key.addListener === "function") {
            const attributeChunks = curr.split('="');
            const attributePrefix = attributeChunks.pop();
            const htmlErrata = attributeChunks.join('="');
            const placeholder = uuid();

            let suffix = '';
            if (!strings[i + 1].includes('"')) {
                throw new Error('Tybalt currently only supports one reactive per attribute. Please consolidate.');
            } else if (!strings[i + 1].startsWith('"')) {
                suffix = strings[i + 1].split('"')[0];
            }

            const chunks = htmlErrata.split(/\s+/);
            const attributeName = chunks[chunks.length - 1];

            setAttributePlaceholders.set(placeholder, {
                prefix: attributePrefix || '',
                reactive: key,
                suffix,
                attributeName,
            });

            prevAttribute = true;

            // TODO: Multi-track drifting! (multiple reactives in a single attribute value)
            return `${prev}${htmlErrata}="${attributePrefix}${key.value}${suffix}" ${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"`;
        }

        if (typeof key.addListener === 'function') {
            forceRerenderOnUpdate(key);
        }

        // @input="${inputHandler}"
        if (EVENT_LISTENER_REGEX.test(curr)) {
            const [preAt, postAt] = curr.split('@');
            const eventName = extractEventName(postAt);
            const placeholder = uuid();

            eventPlaceholders.set(placeholder, { eventName, listener: key });

            return `${prev}${preAt}${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true`;
        } 
        
        if (Array.isArray(key)) {
            const children = key.map((key: HtmlTemplate) => renderToString(key, eventPlaceholders, setAttributePlaceholders)).join('');
            return `${prev}${curr}${children}`;
        }

        if (key?.addListener) {
            if (key?.value.strings && key?.value.keys) {
                return `${prev}${curr}${renderToString(key, eventPlaceholders, setAttributePlaceholders)}`;
            }

            if (Array.isArray(key.value)) {
                const children = key
                    .value
                    .map((templ: HtmlTemplate) => renderToString(templ, eventPlaceholders, setAttributePlaceholders)).join('');
                return `${prev}${curr}${children}`;
            } 

            return `${prev}${curr}${key.value}`;
        }
        
        if (key?.strings && key?.keys) {
            return `${prev}${curr}${renderToString(key, eventPlaceholders, setAttributePlaceholders)}`;
        }

        return `${prev}${curr}${key}`;
    }, '');
}

export default (template: HtmlTemplate): HTMLCollection => {
    const mountPoint = document.createElement('div');
    const eventPlaceholders = new Map<string, { listener: () => void; eventName: string }>();
    const setAttributePlaceholders = new Map<string, { reactive: Reactive<any>; attributeName: string, prefix: string, suffix: string }>();

    mountPoint.innerHTML = renderToString(template, eventPlaceholders, setAttributePlaceholders);

    for (const [placeholder, { listener, eventName }] of eventPlaceholders.entries()) {
        const selector = `[${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"]`
        const placeheld = mountPoint.querySelector(selector);

        if (placeheld === null) {
            console.warn(`expected to find element with selector ${selector}`);
            continue;
        }

        placeheld.addEventListener(eventName, listener);
        placeheld.removeAttribute(`${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}`);
    }

    for (const [placeholder, { reactive, attributeName, prefix, suffix }] of setAttributePlaceholders.entries()) {
        const selector = `[${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"]`;
        const placeheld = mountPoint.querySelector(selector);

        if (placeheld === null) {
            console.warn(`expected to find element with selector ${selector}`);
            continue;
        }

        reactive.addListener((value: string) => { 
            placeheld.setAttribute(attributeName, `${prefix}${value}${suffix}`);
        });

        placeheld.removeAttribute(`${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}`);
    }

    return mountPoint.children;
}