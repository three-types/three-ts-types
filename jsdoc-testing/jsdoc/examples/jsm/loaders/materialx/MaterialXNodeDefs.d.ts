/**
 * Resolves the nodedef of a node instance like `Node::getNodeDef()` in MaterialX.
 *
 * @param {MaterialXNode} nodeX - The node instance.
 * @return {?{name: string, node: string, inputs: Object, outputs: Object}} The resolved nodedef or `null`.
 */
export function resolveNodeDef(nodeX: MaterialXNode): {
    name: string;
    node: string;
    inputs: Object;
    outputs: Object;
} | null;
/**
 * Returns the names of the stdlib nodedefs that implement a node category.
 *
 * @param {string} category - The node category, e.g. `'multiply'`.
 * @return {Array<string>} The nodedef names, empty when the category is unknown.
 */
export function getNodeDefNames(category: string): Array<string>;
