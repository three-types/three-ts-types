export default EnvironmentNode;
/**
 * Represents a physical model for Image-based lighting (IBL). The environment
 * is defined via environment maps in the equirectangular, cube map or cubeUV (PMREM) format.
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
    setup(builder: any): void;
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
