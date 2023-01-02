import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

export default ({ key, node }: { key: string, node: TSESTree.ObjectExpression }): TSESTree.ObjectLiteralElement | null => {
    for (const property of node.properties) {
        if (property.type !== 'Property' || (property.type === 'Property' && property.computed === true)) {
            return null;
        }

        if (
            property.key.type === AST_NODE_TYPES.Literal && property.key.value === key || 
            property.key.type === AST_NODE_TYPES.Identifier && property.key.name === key
        ) {
            return property;
        }
    }

    return null;
};
