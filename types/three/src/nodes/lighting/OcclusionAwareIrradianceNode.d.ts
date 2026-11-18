import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import LightingNode from "./LightingNode.js";

/**
 * A generic class that can be used by nodes which contribute irradiance
 * that already accounts for ambient occlusion, e.g. global illumination.
 * Unlike {@link IrradianceNode}, the contribution is not modulated by
 * the ambient occlusion of the lighting model. Used in {@link NodeMaterial}.
 *
 * @augments LightingNode
 */
declare class OcclusionAwareIrradianceNode extends LightingNode {
    /**
     * Constructs a new occlusion-aware irradiance node.
     *
     * @param {Node<vec3>} node - A node contributing irradiance that accounts for ambient occlusion.
     */
    constructor(node: Node<"vec3">);
    /**
     * A node contributing irradiance that accounts for ambient occlusion.
     *
     * @type {Node<vec3>}
     */
    node: Node<"vec3">;
    setup(builder: NodeBuilder): void;
}

export default OcclusionAwareIrradianceNode;
