export default FilmNode;
/**
 * TSL function for creating a film node for post processing.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} inputNode - The node that represents the input of the effect.
 * @param {?Node<float>} [intensityNode=null] - A node that represents the effect's intensity.
 * @param {?Node<vec2>} [uvNode=null] - A node that allows to pass custom (e.g. animated) uv data.
 * @returns {FilmNode}
 */
export const film: any;
/**
 * Post processing node for creating a film grain effect.
 *
 * @augments TempNode
 * @three_import import { film } from 'three/addons/tsl/display/FilmNode.js';
 */
declare class FilmNode extends TempNode {
    /**
     * Constructs a new film node.
     *
     * @param {Node} inputNode - The node that represents the input of the effect.
     * @param {?Node<float>} [intensityNode=null] - A node that represents the effect's intensity.
     * @param {?Node<vec2>} [uvNode=null] - A node that allows to pass custom (e.g. animated) uv data.
     */
    constructor(inputNode: Node, intensityNode?: Node<float> | null, uvNode?: Node<vec2> | null);
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node}
     */
    inputNode: Node;
    /**
     * A node that represents the effect's intensity.
     *
     * @type {?Node<float>}
     * @default null
     */
    intensityNode: Node<float> | null;
    /**
     * A node that allows to pass custom (e.g. animated) uv data.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    uvNode: Node<vec2> | null;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
