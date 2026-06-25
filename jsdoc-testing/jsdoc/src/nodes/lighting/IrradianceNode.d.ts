export default IrradianceNode;
/**
 * A generic class that can be used by nodes which contribute
 * irradiance to the scene. E.g. a light map node can be used
 * as input for this module. Used in {@link NodeMaterial}.
 *
 * @augments LightingNode
 */
declare class IrradianceNode extends LightingNode {
    /**
     * Constructs a new irradiance node.
     *
     * @param {Node<vec3>} node - A node contributing irradiance.
     */
    constructor(node: Node<vec3>);
    /**
     * A node contributing irradiance.
     *
     * @type {Node<vec3>}
     */
    node: Node<vec3>;
    setup(builder: any): void;
}
import LightingNode from './LightingNode.js';
