export default StackNode;
/**
 * TSL function for creating a stack node.
 *
 * @tsl
 * @function
 * @param {?StackNode} [parent=null] - The parent stack node.
 * @returns {StackNode}
 */
export const stack: any;
/**
 * Stack is a helper for Nodes that need to produce stack-based code instead of continuous flow.
 * They are usually needed in cases like `If`, `Else`.
 *
 * @augments Node
 */
declare class StackNode extends Node {
    /**
     * Constructs a new stack node.
     *
     * @param {?StackNode} [parent=null] - The parent stack node.
     */
    constructor(parent?: StackNode | null);
    /**
     * List of nodes.
     *
     * @type {Array<Node>}
     */
    nodes: Array<Node>;
    /**
     * The output node.
     *
     * @type {?Node}
     * @default null
     */
    outputNode: Node | null;
    /**
     * The parent stack node.
     *
     * @type {?StackNode}
     * @default null
     */
    parent: StackNode | null;
    /**
     * The current conditional node.
     *
     * @private
     * @type {ConditionalNode}
     * @default null
     */
    private _currentCond;
    /**
     * The expression node. Only
     * relevant for Switch/Case.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _expressionNode;
    /**
     * The current node being processed.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _currentNode;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStackNode: boolean;
    getElementType(builder: any): string;
    getNodeType(builder: any): string;
    getMemberType(builder: any, name: any): string;
    /**
     * Adds a node to this stack.
     *
     * @param {Node} node - The node to add.
     * @param {number} [index=this.nodes.length] - The index where the node should be added.
     * @return {StackNode} A reference to this stack node.
     */
    addToStack(node: Node, index?: number): StackNode;
    /**
     * Adds a node to the stack before the current node.
     *
     * @param {Node} node - The node to add.
     * @return {StackNode} A reference to this stack node.
     */
    addToStackBefore(node: Node): StackNode;
    /**
     * Represent an `if` statement in TSL.
     *
     * @param {Node} boolNode - Represents the condition.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    If(boolNode: Node, method: Function): StackNode;
    /**
     * Represent an `elseif` statement in TSL.
     *
     * @param {Node} boolNode - Represents the condition.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    ElseIf(boolNode: Node, method: Function): StackNode;
    /**
     * Represent an `else` statement in TSL.
     *
     * @param {Function} method - TSL code which is executed in the `else` case.
     * @return {StackNode} A reference to this stack node.
     */
    Else(method: Function): StackNode;
    /**
     * Represents a `switch` statement in TSL.
     *
     * @param {any} expression - Represents the expression.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    Switch(expression: any): StackNode;
    /**
     * Represents a `case` statement in TSL. The TSL version accepts an arbitrary numbers of values.
     * The last parameter must be the callback method that should be executed in the `true` case.
     *
     * @param {...any} params - The values of the `Case()` statement as well as the callback method.
     * @return {StackNode} A reference to this stack node.
     */
    Case(...params: any[]): StackNode;
    /**
     * Represents the default code block of a Switch/Case statement.
     *
     * @param {Function} method - TSL code which is executed in the `else` case.
     * @return {StackNode} A reference to this stack node.
     */
    Default(method: Function): StackNode;
    setup(builder: any): any;
    hasOutput(builder: any): boolean | null;
    build(builder: any, ...params: any[]): string | Node | null;
}
import Node from './Node.js';
