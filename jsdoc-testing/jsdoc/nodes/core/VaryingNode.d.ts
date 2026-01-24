export default VaryingNode;
/**
 * TSL function for creating a varying node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node for which a varying should be created.
 * @param {?string} name - The name of the varying in the shader.
 * @returns {VaryingNode}
 */
export const varying: any;
export function vertexStage(node: Node): VaryingNode;
/**
 * Class for representing shader varyings as nodes. Varyings are create from
 * existing nodes like the following:
 *
 * ```js
 * const positionLocal = positionGeometry.toVarying( 'vPositionLocal' );
 * ```
 *
 * @augments Node
 */
declare class VaryingNode extends Node {
    /**
     * Constructs a new varying node.
     *
     * @param {Node} node - The node for which a varying should be created.
     * @param {?string} name - The name of the varying in the shader.
     */
    constructor(node: Node, name?: string | null);
    /**
     * The node for which a varying should be created.
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
    readonly isVaryingNode: boolean;
    /**
     * The interpolation type of the varying data.
     *
     * @type {?string}
     * @default null
     */
    interpolationType: string | null;
    /**
     * The interpolation sampling type of varying data.
     *
     * @type {?string}
     * @default null
     */
    interpolationSampling: string | null;
    /**
     * Defines the interpolation type of the varying.
     *
     * @param {string} type - The interpolation type.
     * @param {?string} sampling - The interpolation sampling type
     * @return {VaryingNode} A reference to this node.
     */
    setInterpolation(type: string, sampling?: string | null): VaryingNode;
    getHash(builder: any): string;
    getNodeType(builder: any): string;
    /**
     * This method performs the setup of a varying node with the current node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeVarying} The node varying from the node builder.
     */
    setupVarying(builder: NodeBuilder): NodeVarying;
    setup(builder: any): void;
    analyze(builder: any): void;
    generate(builder: any): any;
}
import Node from './Node.js';
