export default NodeCode;
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent user-defined, native shader code portions that are going to be
 * injected by the builder. A dictionary of node codes is maintained in {@link NodeBuilder#codes}
 * for this purpose.
 */
declare class NodeCode {
    /**
     * Constructs a new code node.
     *
     * @param {string} name - The name of the code.
     * @param {string} type - The node type.
     * @param {string} [code=''] - The native shader code.
     */
    constructor(name: string, type: string, code?: string);
    /**
     * The name of the code.
     *
     * @type {string}
     */
    name: string;
    /**
     * The node type.
     *
     * @type {string}
     */
    type: string;
    /**
     * The native shader code.
     *
     * @type {string}
     * @default ''
     */
    code: string;
}
