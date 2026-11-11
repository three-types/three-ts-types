export default EnvironmentNode;
/**
 * Represents a physical model for Image-based lighting (IBL). The environment
 * is defined by an equirectangular or cube texture.
 * `EnvironmentNode` is intended for PBR materials like {@link MeshStandardNodeMaterial}.
 *
 * @augments LightingNode
 */
declare class EnvironmentNode extends LightingNode {
    /**
     * Constructs a new environment node.
     *
     * @param {Node} [envNode=null] - A node representing the environment.
     */
    constructor(envNode?: Node);
    /**
     * A node representing the environment.
     *
     * @type {?Node}
     * @default null
     */
    envNode: Node | null;
    /**
     * The PMREM node of a texture or material reference environment. Its texture is
     * resolved before rendering since materials with different environments can share a shader.
     *
     * @private
     * @type {?PMREMNode}
     * @default null
     */
    private _pmremNode;
    setup(builder: any): void;
    updateBefore(frame: any): void;
    /**
     * Returns the current texture of the environment node.
     *
     * @private
     * @param {(NodeFrame|NodeBuilder)} state - The current state.
     * @return {Texture} The environment texture.
     */
    private _getEnvTexture;
    /**
     * Returns the PMREM node cache of the current renderer.
     *
     * @private
     * @param {Renderer} renderer - The current renderer.
     * @return {WeakMap} The node cache.
     */
    private _getPMREMNodeCache;
}
import LightingNode from './LightingNode.js';
