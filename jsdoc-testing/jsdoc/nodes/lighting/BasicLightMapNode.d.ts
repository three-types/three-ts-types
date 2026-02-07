export default BasicLightMapNode;
/**
 * A specific version of {@link IrradianceNode} that is only relevant
 * for {@link MeshBasicNodeMaterial}. Since the material is unlit, it
 * requires a special scaling factor for the light map.
 *
 * @augments LightingNode
 */
declare class BasicLightMapNode extends LightingNode {
    /**
     * Constructs a new basic light map node.
     *
     * @param {?Node<vec3>} [lightMapNode=null] - The light map node.
     */
    constructor(lightMapNode?: Node<vec3> | null);
    /**
     * The light map node.
     *
     * @type {?Node<vec3>}
     */
    lightMapNode: Node<vec3> | null;
    setup(builder: any): void;
}
import LightingNode from './LightingNode.js';
