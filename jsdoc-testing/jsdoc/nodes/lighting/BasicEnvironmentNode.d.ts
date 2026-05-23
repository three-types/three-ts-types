export default BasicEnvironmentNode;
/**
 * Represents a basic model for Image-based lighting (IBL). The environment
 * is defined via environment maps in the equirectangular or cube map format.
 * `BasicEnvironmentNode` is intended for non-PBR materials like {@link MeshBasicNodeMaterial}
 * or {@link MeshPhongNodeMaterial}.
 *
 * @augments LightingNode
 */
declare class BasicEnvironmentNode extends LightingNode {
    /**
     * Constructs a new basic environment node.
     *
     * @param {Node} [envNode=null] - A node representing the environment.
     */
    constructor(envNode?: Node);
    /**
     * A node representing the environment.
     *
     * @type {Node}
     * @default null
     */
    envNode: Node;
    setup(builder: any): void;
}
import LightingNode from './LightingNode.js';
