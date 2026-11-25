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
     * Stores additional data for nodes that are added to the stack.
     *
     * @private
     * @type {Map<Node, {delta: number}>}
     */
    private _nodeDataLibrary;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStackNode: boolean;
    getElementType(builder: any): string;
    generateNodeType(builder: any): string;
    getMemberType(builder: any, name: any): string;
    /**
     * Adds a node to this stack.
     *
     * @param {Node} node - The node to add.
     * @param {number} [index=-1] - The index of the node. If not specified, the node will be added to the end of the stack.
     * @return {StackNode} A reference to this stack node.
     */
    addToStack(node: Node, index?: number): StackNode;
    /**
     * Adds a node to the stack before the given node, by default the current node.
     *
     * @param {Node} node - The node to add.
     * @param {?Node} [beforeNode=this._currentNode] - The node of the stack that the node is added before.
     * @return {StackNode} A reference to this stack node.
     */
    addToStackBefore(node: Node, beforeNode?: Node | null): StackNode;
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
    /**
     * Whether the nodes of this stack only declare variables and compute values, e.g. the body of a function
     * which does not assign a value or call a function that is not pure.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether the stack is pure.
     */
    isPure(builder: NodeBuilder): boolean;
    isDeadCode(builder: any): boolean;
    analyze(builder: any): void;
    build(builder: any, ...params: any[]): string | Node | null | undefined;
    /**
     * Analyzes the nodes in reverse order, so the reads of a value are counted before its
     * assignments and the dead code is not analyzed, see {@link Node#isDeadCode}. The nodes
     * are analyzed again until no node is added, e.g. a value read in a loop before it is assigned.
     *
     * @private
     * @param {NodeBuilder} builder - The current node builder.
     * @param {boolean} removeDeadCode - Whether the dead code is not analyzed.
     */
    private _analyzeNodes;
    /**
     * Builds a node of the stack as the current node, so the nodes added
     * to the stack during its build are added after it.
     *
     * @private
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} node - The node to build.
     * @param {?(string|Node)} [output] - The output of the build.
     */
    private _buildNode;
}
import Node from './Node.js';
