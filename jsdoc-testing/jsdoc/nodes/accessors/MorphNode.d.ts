export default MorphNode;
/**
 * TSL function for creating a morph node.
 *
 * @tsl
 * @function
 * @param {Mesh} mesh - The mesh holding the morph targets.
 * @returns {MorphNode}
 */
export const morphReference: any;
/**
 * This node implements the vertex transformation shader logic which is required
 * for morph target animation.
 *
 * @augments Node
 */
declare class MorphNode extends Node {
    /**
     * Constructs a new morph node.
     *
     * @param {Mesh} mesh - The mesh holding the morph targets.
     */
    constructor(mesh: Mesh);
    /**
     * The mesh holding the morph targets.
     *
     * @type {Mesh}
     */
    mesh: Mesh;
    /**
     * A uniform node which represents the morph base influence value.
     *
     * @type {UniformNode<float>}
     */
    morphBaseInfluence: UniformNode<any>;
    /**
     * Setups the morph node by assigning the transformed vertex data to predefined node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Updates the state of the morphed mesh by updating the base influence.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(): void;
}
import Node from '../core/Node.js';
