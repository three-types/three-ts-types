export function directPointLight({ color, lightVector, cutoffDistance, decayExponent }: {
    color: any;
    lightVector: any;
    cutoffDistance: any;
    decayExponent: any;
}): {
    lightDirection: any;
    lightColor: any;
};
export default PointLightNode;
/**
 * Module for representing point lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class PointLightNode extends AnalyticLightNode {
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
     * Overwritten to updated point light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setupDirect(builder: any): {
        lightDirection: any;
        lightColor: any;
    };
}
import AnalyticLightNode from './AnalyticLightNode.js';
