export default VarNode;
export function Var(node: Node, name?: string | null): VarNode;
export function Const(node: Node, name?: string | null): VarNode;
export function VarIntent(node: Node): VarNode;
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
    /**
     * This flag is used to indicate that this node is used for intent.
     *
     * @type {boolean}
     * @default false
     */
    intent: boolean;
    /**
     * Sets the intent flag for this node.
     *
     * This flag is used to indicate that this node is used for intent
     * and should not be built directly. Instead, it is used to indicate that
     * the node should be treated as a variable intent.
     *
     * It's useful for assigning variables without needing creating a new variable node.
     *
     * @param {boolean} value - The value to set for the intent flag.
     * @returns {VarNode} This node.
     */
    setIntent(value: boolean): VarNode;
    /**
     * Returns the intent flag of this node.
     *
     * @return {boolean} The intent flag.
     */
    getIntent(): boolean;
    getMemberType(builder: any, name: any): string;
    getElementType(builder: any): string;
    getNodeType(builder: any): string;
    getArrayCount(builder: any): number | null;
    isAssign(builder: any): any;
    build(...params: any[]): string | Node | null;
    generate(builder: any): any;
}
import Node from './Node.js';
