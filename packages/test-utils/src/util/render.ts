import { toKebabCase } from 'js-convert-case';
import { v4 as uuidV4 } from 'uuid';

import type { ContextEvent } from '@tybalt/core';

import type { AttributeObject, ContextsObject } from '../types';

const ATTRIBUTE_NAME = 'data-tybalt-id';
const WRAPPER_ELEMENT_TAG = 'div';

function isContextEvent<T>(evt: Event | ContextEvent<T>): evt is ContextEvent<T> {
    return (evt as ContextEvent<T>).callback !== undefined;
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

    Object.values(contexts).forEach(context =>
        provideContext(document.body, context);
    );

    let attributeString = '';
    for (const [key, value] of Object.entries(attributes)) {
        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
        attributeString += `${toKebabCase(key)}="${stringifiedValue.replace(/"/g, '&quot;')}"`;
    }

    const rootElement = document.createElement(WRAPPER_ELEMENT_TAG);
    rootElement.setAttribute(ATTRIBUTE_NAME, id);
    rootElement.innerHTML = `<${elementName} ${attributeString}>${slot}</${elementName}>`;

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
