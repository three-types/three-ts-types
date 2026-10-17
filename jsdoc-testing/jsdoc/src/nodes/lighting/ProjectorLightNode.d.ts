export default ProjectorLightNode;
/**
 * An implementation of a projector light node.
 *
 * @augments SpotLightNode
 */
declare class ProjectorLightNode extends SpotLightNode {
    update(frame: any): void;
    /**
     * Overwrites the default implementation to compute projection attenuation.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @return {Node<float>} The spot attenuation.
     */
    getSpotAttenuation(builder: NodeBuilder): Node<any>;
}
import SpotLightNode from './SpotLightNode.js';
