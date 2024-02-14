import type { Context } from '../types';

export default <ValueType>(key: unknown) => key as Context<typeof key, ValueType>;