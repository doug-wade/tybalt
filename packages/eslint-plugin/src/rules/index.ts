// @ts-ignore
import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import componentNamesAreMultiWord from './component-names-are-multi-word.js';

const config = {
    'component-names-are-multi-word': componentNamesAreMultiWord,
};

export default config;
