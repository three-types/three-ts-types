/**
 * Returns the MRT texture index for the given name.
 *
 * @param {Array<Texture>} textures - The textures of a MRT-configured render target.
 * @param {string} name - The name of the MRT texture which index is requested.
 * @return {number} The texture index.
 */
export function getTextureIndex(textures: Array<Texture>, name: string): number;
export default MRTNode;
/**
 * TSL function for creating a MRT node.
 *
 * @tsl
 * @function
 * @param {Object<string, Node>} outputNodes - The MRT outputs.
 * @returns {MRTNode}
 */
export const mrt: any;
/**
 * This node can be used setup a MRT context for rendering. A typical MRT setup for
 * post-processing is shown below:
 * ```js
 * const mrtNode = mrt( {
 *   output: output,
 *   normal: normalView
 * } ) ;
 * ```
 * The MRT output is defined as a dictionary.
 *
 * @augments OutputStructNode
 */
declare class MRTNode extends OutputStructNode {
    /**
     * Constructs a new output struct node.
     *
     * @param {Object<string, Node>} outputNodes - The MRT outputs.
     */
    constructor(outputNodes: {
        [x: string]: Node;
    });
    /**
     * A dictionary representing the MRT outputs. The key
     * is the name of the output, the value the node which produces
     * the output result.
     *
     * @type {Object<string, Node>}
     */
    outputNodes: {
        [x: string]: Node;
    };
    /**
     * A dictionary storing the blend modes for each output.
     *
     * @type {Object<string, BlendMode>}
     */
    blendModes: {
        [x: string]: BlendMode;
    };
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMRTNode: boolean;
    /**
     * Sets the blend mode for the given output name.
     *
     * @param {string} name - The name of the output.
     * @param {BlendMode} blend - The blending mode.
     * @return {MRTNode} The current MRT node.
     */
    setBlendMode(name: string, blend: BlendMode): MRTNode;
    /**
     * Returns the blend mode for the given output name.
     *
     * @param {string} name - The name of the output.
     * @return {BlendMode} The blend mode.
     */
    getBlendMode(name: string): BlendMode;
    /**
     * Returns `true` if the MRT node has an output with the given name.
     *
     * @param {string} name - The name of the output.
     * @return {NodeBuilder} Whether the MRT node has an output for the given name or not.
     */
    has(name: string): NodeBuilder;
    /**
     * Returns the output node for the given name.
     *
     * @param {string} name - The name of the output.
     * @return {Node} The output node.
     */
    get(name: string): Node;
    /**
     * Merges the outputs of the given MRT node with the outputs of this node.
     *
     * @param {MRTNode} mrtNode - The MRT to merge.
     * @return {MRTNode} A new MRT node with merged outputs..
     */
    merge(mrtNode: MRTNode): MRTNode;
    setup(builder: any): import("./Node.js").default | null;
}
import OutputStructNode from './OutputStructNode.js';
import BlendMode from '../../renderers/common/BlendMode.js';
