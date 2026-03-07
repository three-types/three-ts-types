export default FunctionOverloadingNode;
export function overloadingFn(functionNodes: Array<Function>): FunctionOverloadingNode;
/**
 * This class allows to define multiple overloaded versions
 * of the same function. Depending on the parameters of the function
 * call, the node picks the best-fit overloaded version.
 *
 * @augments Node
 */
declare class FunctionOverloadingNode extends Node {
    /**
     * Constructs a new function overloading node.
     *
     * @param {Array<Function>} functionNodes - Array of `Fn` function definitions.
     * @param {...Node} parametersNodes - A list of parameter nodes.
     */
    constructor(functionNodes?: Array<Function>, ...parametersNodes: Node[]);
    /**
     * Array of `Fn` function definitions.
     *
     * @type {Array<Function>}
     */
    functionNodes: Array<Function>;
    /**
     * A list of parameter nodes.
     *
     * @type {Array<Node>}
     */
    parametersNodes: Array<Node>;
    /**
     * The selected overloaded function call.
     *
     * @private
     * @type {ShaderCallNodeInternal}
     */
    private _candidateFn;
    /**
     * Returns the candidate function for the current parameters.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {FunctionNode} The candidate function.
     */
    getCandidateFn(builder: NodeBuilder): FunctionNode;
    /**
     * Sets up the node for the current parameters.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The setup node.
     */
    setup(builder: NodeBuilder): Node;
}
import Node from '../core/Node.js';
