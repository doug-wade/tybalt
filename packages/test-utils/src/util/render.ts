import { toKebabCase } from 'js-convert-case';
import { v4 as uuidV4 } from 'uuid';

import type { AttributeObject } from '../types';

const ATTRIBUTE_NAME = 'data-tybalt-id';
const WRAPPER_ELEMENT_TAG = 'div';

export default async ({
    elementName,
    attributes = new Map(),
    slot = '',
}: {
    elementName: string;
    attributes?: AttributeObject;
    slot?: string;
}): Promise<Element> => {
    const id = uuidV4();

    const rootElement = document.createElement(WRAPPER_ELEMENT_TAG);
    rootElement.setAttribute(ATTRIBUTE_NAME, id);
    rootElement.innerHTML = `<${elementName}>${slot}</${elementName}>`;

    document.body.appendChild(rootElement);

    return new Promise((resolve) => {
        const selector = `${WRAPPER_ELEMENT_TAG}[${ATTRIBUTE_NAME}="${id}"] > ${elementName}`;

        const requestComponent = () => {
            const element = document.querySelector(selector);
            if (element) {
                for (const [key, value] of Object.entries(attributes)) {
                    element.setAttribute(toKebabCase(key), value as string);
                }
                resolve(element);
            } else {
                window.requestAnimationFrame(requestComponent);
            }
        };
        requestComponent();
    });
};
