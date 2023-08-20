import type { SetupContext, RenderContext, PropsStateMap } from './types';

export { SetupContext, RenderContext, PropsStateMap };

export { default as defineComponent } from './api/define-component';
export { default as html } from './api/html';
export { default as createContext } from './api/create-context';
export { default as ContextEvent } from './api/context-event';

/*
 * It seems that esbuild doesn't parse the dependency graph to determine a correct ordering of the modules, so we
 * have to export the components last to avoid errors like: TypeError: define_component_default is not a function.
 */
export * as components from './components';
