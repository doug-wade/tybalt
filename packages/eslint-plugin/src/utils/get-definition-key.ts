import type { TSESTree } from '@typescript-eslint/types';
const { AST_NODE_TYPES } = require('@typescript-eslint/types');

module.exports = ({
    key,
    node,
}: {
    key: string;
    node: TSESTree.ObjectExpression;
}): TSESTree.ObjectLiteralElement | null => {
    for (const property of node.properties) {
        if (property.type !== 'Property' || (property.type === 'Property' && property.computed === true)) {
            return null;
        }

        if (
            (property.key.type === AST_NODE_TYPES.Literal && (property.key as TSESTree.Literal).value === key) ||
            (property.key.type === AST_NODE_TYPES.Identifier && (property.key as TSESTree.Identifier).name === key)
        ) {
            return property;
        }
    }

    return null;
};
