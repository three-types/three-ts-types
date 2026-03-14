export default LightProbeNode;
/**
 * Module for representing light probes as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class LightProbeNode extends AnalyticLightNode {
    /**
     * Light probe represented as a uniform of spherical harmonics.
     *
     * @type {UniformArrayNode}
     */
    lightProbe: UniformArrayNode;
    /**
     * Overwritten to updated light probe specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setup(builder: any): void;
}
import AnalyticLightNode from './AnalyticLightNode.js';
