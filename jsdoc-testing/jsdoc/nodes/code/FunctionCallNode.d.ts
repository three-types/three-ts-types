export default FunctionCallNode;
export function call(func: any, ...params: any[]): any;
/**
 * This module represents the call of a {@link FunctionNode}. Developers are usually not confronted
 * with this module since they use the predefined TSL syntax `wgslFn` and `glslFn` which encapsulate
 * this logic.
 *
 * @augments TempNode
 */
declare class FunctionCallNode extends TempNode {
    /**
     * Constructs a new function call node.
     *
     * @param {?FunctionNode} functionNode - The function node.
     * @param {Object<string, Node>} [parameters={}] - The parameters for the function call.
     */
    constructor(functionNode?: FunctionNode | null, parameters?: {
        [x: string]: Node;
    });
    /**
     * The function node.
     *
     * @type {?FunctionNode}
     * @default null
     */
    functionNode: FunctionNode | null;
    /**
     * The parameters of the function call.
     *
     * @type {Object<string, Node>}
     * @default {}
     */
    parameters: {
        [x: string]: Node;
    };
    /**
     * Sets the parameters of the function call node.
     *
     * @param {Object<string, Node>} parameters - The parameters to set.
     * @return {FunctionCallNode} A reference to this node.
     */
    setParameters(parameters: {
        [x: string]: Node;
    }): FunctionCallNode;
    /**
     * Returns the parameters of the function call node.
     *
     * @return {Object<string, Node>} The parameters of this node.
     */
    getParameters(): {
        [x: string]: Node;
    };
    getNodeType(builder: any): any;
    generate(builder: any): string;
}
import TempNode from '../core/TempNode.js';
