export default VarNode;
export function Var(node: Node, name?: string | null): VarNode;
export function Const(node: Node, name?: string | null): VarNode;
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
     * Sets the assignable flag for this node.
     *
     * An assignable node is generated as an expression until it is assigned,
     * at which point it is declared as a variable.
     *
     * @param {boolean} value - The value to set for the assignable flag.
     * @returns {VarNode} This node.
     */
    setAssignable(value: boolean): VarNode;
    /**
     * Returns the assignable flag of this node.
     *
     * @return {boolean} The assignable flag.
     */
    getAssignable(): boolean;
    getMemberType(builder: any, name: any): string;
    getElementType(builder: any): string;
    generateNodeType(builder: any): string;
    getArrayCount(builder: any): number | null;
    build(builder: any, output?: null): any;
    generate(builder: any): any;
}
import Node from './Node.js';
