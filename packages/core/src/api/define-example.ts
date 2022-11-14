import type { DefineExampleOptions } from '../types';

export default (definition : CustomElementConstructor, { attributes, controls, listeners } : DefineExampleOptions) => {
    console.log(`creating example for ${definition.name} with attribute ${attributes} controls ${controls} and listeners ${listeners}`);
};