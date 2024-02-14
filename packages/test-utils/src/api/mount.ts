import getElementName from '../util/get-element-name';
import Wrapper from '../util/base-wrapper';
import render from '../util/render';

import type { MountOptions } from '../types';

export default async (
    definition: CustomElementConstructor,
    { attributes, slot, contexts }: MountOptions = { attributes: {} },
) => {
    const elementName = getElementName({ definition });
    const stringifiedAttributes = Object.fromEntries(
        Object.entries(attributes || {}).map(([key, value]) => [
            key,
            typeof value === 'string' ? value : JSON.stringify(value),
        ]),
    );

    const element = await render({ attributes: stringifiedAttributes, elementName, slot, contexts });

    return new Wrapper({ element });
};
