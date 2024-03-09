import { toKebabCase } from 'js-convert-case';
import { v4 as uuidV4 } from 'uuid';

import type { Context, ContextEvent, UnknownContext } from '@tybalt/context';

import type { AttributeObject, ContextsObject } from '../types';

const ATTRIBUTE_NAME = 'data-tybalt-id';
const WRAPPER_ELEMENT_TAG = 'div';

function isContextEvent(evt: Event | ContextEvent<UnknownContext>): evt is ContextEvent<UnknownContext> {
    return (evt as ContextEvent<UnknownContext>).callback !== undefined && (evt as ContextEvent<UnknownContext>).context !== undefined;
}

export default async ({
    elementName,
    attributes = new Map(),
    slot = '',
    contexts = {},
}: {
    elementName: string;
    attributes?: AttributeObject;
    slot?: string;
    contexts?: ContextsObject;
}): Promise<Element> => {
    const id = uuidV4();

    let attributeString = '';
    for (const [key, value] of Object.entries(attributes)) {
        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
        attributeString += `${toKebabCase(key)}="${stringifiedValue.replace(/"/g, '&quot;')}"`;
    }

    const rootElement = document.createElement(WRAPPER_ELEMENT_TAG);
    rootElement.setAttribute(ATTRIBUTE_NAME, id);
    rootElement.innerHTML = `<${elementName} ${attributeString}>${slot}</${elementName}>`;

    Object.values(contexts).forEach(context => {
        provideContext(document.body, context)
    });
    document.body.appendChild(rootElement);

    return new Promise((resolve) => {
        const selector = `${WRAPPER_ELEMENT_TAG}[${ATTRIBUTE_NAME}="${id}"] > ${elementName}`;

        const requestComponent = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                window.requestAnimationFrame(requestComponent);
            }
        };

        requestComponent();
    });
};

function provideContext<T>(element: Element, context: Context<T>): void {
    element.addEventListener('context-request', (evt) => {
        if (isContextEvent(evt)) {
            if (evt.context.name === context.name) {
                evt.callback(context.initialValue);
            }
        }
    });
}
