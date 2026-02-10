export default NodeFunction;
/**
 * Base class for node functions. A derived module must be implemented
 * for each supported native shader language. Similar to other `Node*` modules,
 * this class is only relevant during the building process and not used
 * in user-level code.
 */
declare class NodeFunction {
    /**
     * Constructs a new node function.
     *
     * @param {string} type - The node type. This type is the return type of the node function.
     * @param {Array<NodeFunctionInput>} inputs - The function's inputs.
     * @param {string} [name=''] - The function's name.
     * @param {string} [precision=''] - The precision qualifier.
     */
    constructor(type: string, inputs: Array<NodeFunctionInput>, name?: string, precision?: string);
    /**
     * The node type. This type is the return type of the node function.
     *
     * @type {string}
     */
    type: string;
    /**
     * The function's inputs.
     *
     * @type {Array<NodeFunctionInput>}
     */
    inputs: Array<NodeFunctionInput>;
    /**
     * The name of the uniform.
     *
     * @type {string}
     * @default ''
     */
    name: string;
    /**
     * The precision qualifier.
     *
     * @type {string}
     * @default ''
     */
    precision: string;
    /**
     * This method returns the native code of the node function.
     *
     * @abstract
     * @param {string} name - The function's name.
     * @return {string} A shader code.
     */
    getCode(): string;
}
declare namespace NodeFunction {
    let isNodeFunction: boolean;
}
