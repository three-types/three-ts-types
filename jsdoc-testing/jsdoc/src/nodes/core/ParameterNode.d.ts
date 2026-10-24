export default ParameterNode;
export function parameter(type: string, name: string | null): ParameterNode;
/**
 * Special version of {@link PropertyNode} which is used for parameters.
 *
 * @augments PropertyNode
 */
declare class ParameterNode extends PropertyNode {
    /**
     * Constructs a new parameter node.
     *
     * @param {string} nodeType - The type of the node.
     * @param {?string} [name=null] - The name of the parameter in the shader.
     */
    constructor(nodeType: string, name?: string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isParameterNode: boolean;
    /**
     * Gets the type of a member variable in the parameter node.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @param {string} name - The name of the member variable.
     * @returns {string}
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    getHash(): string;
    generate(): string;
}
import PropertyNode from './PropertyNode.js';
