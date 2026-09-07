export default SpotLightNode;
/**
 * Module for representing spot lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class SpotLightNode extends AnalyticLightNode {
    /**
     * Uniform node representing the cone cosine.
     *
     * @type {UniformNode<float>}
     */
    coneCosNode: UniformNode<float>;
    /**
     * Uniform node representing the penumbra cosine.
     *
     * @type {UniformNode<float>}
     */
    penumbraCosNode: UniformNode<float>;
    /**
     * Uniform node representing the cutoff distance.
     *
     * @type {UniformNode<float>}
     */
    cutoffDistanceNode: UniformNode<float>;
    /**
     * Uniform node representing the decay exponent.
     *
     * @type {UniformNode<float>}
     */
    decayExponentNode: UniformNode<float>;
    /**
     * Overwritten to updated spot light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Computes the spot attenuation for the given angle.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @param {Node<float>} angleCosine - The angle to compute the spot attenuation for.
     * @return {Node<float>} The spot attenuation.
     */
    getSpotAttenuation(builder: NodeBuilder, angleCosine: Node<float>): Node<float>;
    getLightCoord(builder: any): any;
    setupDirect(builder: any): {
        lightColor: any;
        lightDirection: any;
    };
}
import AnalyticLightNode from './AnalyticLightNode.js';
