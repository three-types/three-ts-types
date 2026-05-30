export default LightingContextNode;
export const lightingContext: any;
/**
 * `LightingContextNode` represents an extension of the {@link ContextNode} module
 * by adding lighting specific context data. It represents the runtime context of
 * {@link LightsNode}.
 *
 * @augments ContextNode
 */
declare class LightingContextNode extends ContextNode {
    /**
     * Constructs a new lighting context node.
     *
     * @param {LightsNode} lightsNode - The lights node.
     * @param {?LightingModel} [lightingModel=null] - The current lighting model.
     * @param {?Node<vec3>} [backdropNode=null] - A backdrop node.
     * @param {?Node<float>} [backdropAlphaNode=null] - A backdrop alpha node.
     */
    constructor(lightsNode: LightsNode, lightingModel?: LightingModel | null, backdropNode?: Node<any> | null, backdropAlphaNode?: Node<any> | null);
    /**
     * The current lighting model.
     *
     * @type {?LightingModel}
     * @default null
     */
    lightingModel: LightingModel | null;
    /**
     * A backdrop node.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    backdropNode: Node<any> | null;
    /**
     * A backdrop alpha node.
     *
     * @type {?Node<float>}
     * @default null
     */
    backdropAlphaNode: Node<any> | null;
    _value: {
        radiance: Node<any>;
        irradiance: Node<any>;
        iblIrradiance: Node<any>;
        ambientOcclusion: Node<any>;
        reflectedLight: {
            directDiffuse: Node<any>;
            directSpecular: Node<any>;
            indirectDiffuse: Node<any>;
            indirectSpecular: Node<any>;
        };
        backdrop: Node<any>;
        backdropAlpha: Node<any>;
    } | null;
    /**
     * Returns a lighting context object.
     *
     * @return {{
     * radiance: Node<vec3>,
     * irradiance: Node<vec3>,
     * iblIrradiance: Node<vec3>,
     * ambientOcclusion: Node<float>,
     * reflectedLight: {directDiffuse: Node<vec3>, directSpecular: Node<vec3>, indirectDiffuse: Node<vec3>, indirectSpecular: Node<vec3>},
     * backdrop: Node<vec3>,
     * backdropAlpha: Node<float>
     * }} The lighting context object.
     */
    getContext(): {
        radiance: Node<any>;
        irradiance: Node<any>;
        iblIrradiance: Node<any>;
        ambientOcclusion: Node<any>;
        reflectedLight: {
            directDiffuse: Node<any>;
            directSpecular: Node<any>;
            indirectDiffuse: Node<any>;
            indirectSpecular: Node<any>;
        };
        backdrop: Node<any>;
        backdropAlpha: Node<any>;
    };
}
import ContextNode from '../core/ContextNode.js';
