export default RectAreaLightNode;
/**
 * Module for representing rect area lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class RectAreaLightNode extends AnalyticLightNode {
    /**
     * Used to configure the internal BRDF approximation texture data.
     *
     * @param {RectAreaLightTexturesLib} ltc - The BRDF approximation texture data.
     */
    static setLTC(ltc: RectAreaLightTexturesLib): void;
    /**
     * Uniform node representing the half height of the are light.
     *
     * @type {UniformNode<vec3>}
     */
    halfHeight: UniformNode<vec3>;
    /**
     * Uniform node representing the half width of the are light.
     *
     * @type {UniformNode<vec3>}
     */
    halfWidth: UniformNode<vec3>;
    /**
     * Overwritten to updated rect area light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setupDirectRectArea(builder: any): {
        lightColor: Node;
        lightPosition: UniformNode<vec3>;
        halfWidth: UniformNode<vec3>;
        halfHeight: UniformNode<vec3>;
        ltc_1: import("../accessors/TextureNode.js").default;
        ltc_2: import("../accessors/TextureNode.js").default;
    };
}
import AnalyticLightNode from './AnalyticLightNode.js';
