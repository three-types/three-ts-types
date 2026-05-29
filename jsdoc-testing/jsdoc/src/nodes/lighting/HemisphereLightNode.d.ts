export default HemisphereLightNode;
/**
 * Module for representing hemisphere lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class HemisphereLightNode extends AnalyticLightNode {
    /**
     * Uniform node representing the light's position.
     *
     * @type {UniformNode<vec3>}
     */
    lightPositionNode: UniformNode<vec3>;
    /**
     * A node representing the light's direction.
     *
     * @type {Node<vec3>}
     */
    lightDirectionNode: Node<vec3>;
    /**
     * Uniform node representing the light's ground color.
     *
     * @type {UniformNode<vec3>}
     */
    groundColorNode: UniformNode<vec3>;
    /**
     * Overwritten to updated hemisphere light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setup(builder: any): void;
}
import AnalyticLightNode from './AnalyticLightNode.js';
