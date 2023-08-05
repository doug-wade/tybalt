// Note: we take a bunch of vars here we don't use because it makes the type system happy.
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Wrapper } from '../types';

export default class EmptyWrapper implements Wrapper {
    #selector: string;
    get length(): number {
        return 0;
    }

    constructor({ selector }: { selector: string }) {
        this.#selector = selector;
    }

    #makeErrorMessage({ method }: { method: string }) {
        return `find did not return ${this.#selector}, cannot call ${method}() on empty Wrapper`;
    }

    find(selector: string): never {
        throw new Error(this.#makeErrorMessage({ method: 'find' }));
    }

    findAll(selector: string): never {
        throw new Error(this.#makeErrorMessage({ method: 'findAll' }));
    }

    exists() {
        return false;
    }

    findComponent(definition: CustomElementConstructor): never {
        throw new Error(this.#makeErrorMessage({ method: 'findComponent' }));
    }

    findComponentAll(definition: CustomElementConstructor): never {
        throw new Error(this.#makeErrorMessage({ method: 'findComponentAll' }));
    }

    html(): never {
        throw new Error(this.#makeErrorMessage({ method: 'html' }));
    }

    text(): never {
        throw new Error(this.#makeErrorMessage({ method: 'text' }));
    }

    attributes(): never {
        throw new Error(this.#makeErrorMessage({ method: 'attributes' }));
    }

    classes(): never {
        throw new Error(this.#makeErrorMessage({ method: 'classes' }));
    }

    trigger(type: string, payload?: any): never {
        throw new Error(this.#makeErrorMessage({ method: 'trigger' }));
    }

    setAttribute(type: string, payload?: any): never {
        throw new Error(this.#makeErrorMessage({ method: 'setAttribute' }));
    }
}
