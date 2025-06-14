export default VarNode;
export function Var(node: Node, name?: string | null): VarNode;
export function Const(node: Node, name?: string | null): VarNode;
export function temp(node: any): VarNode;
/**
 * Class for representing shader variables as nodes. Variables are created from
 * existing nodes like the following:
 *
 * ```js
 * const depth = sampleDepth( uvNode ).toVar( 'depth' );
 * ```
 *
 * @augments Node
 */
declare class VarNode extends Node {
    /**
     * Constructs a new variable node.
     *
     * @param {Node} node - The node for which a variable should be created.
     * @param {?string} [name=null] - The name of the variable in the shader.
     * @param {boolean} [readOnly=false] - The read-only flag.
     */
    constructor(node: Node, name?: string | null, readOnly?: boolean);
    /**
     * The node for which a variable should be created.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The name of the variable in the shader. If no name is defined,
     * the node system auto-generates one.
     *
     * @type {?string}
     * @default null
     */
    name: string | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVarNode: boolean;
    /**
     *
     * The read-only flag.
     *
     * @type {boolean}
     * @default false
     */
    readOnly: boolean;
    getMemberType(builder: any, name: any): string;
    getElementType(builder: any): string;
    getNodeType(builder: any): string;
    generate(builder: any): any;
}
import Node from './Node.js';
