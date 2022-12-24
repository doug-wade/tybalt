import getElementName from '../util/get-element-name';
import Wrapper from '../util/base-wrapper';
import render from '../util/render';

import type { MountOptions } from '../types';

export default async (definition: CustomElementConstructor, { attributes, slot }: MountOptions = {}) => {
    const elementName = getElementName({ definition });
    const element = await render({ attributes, elementName, slot });

    return new Wrapper({ element });
};
