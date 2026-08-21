export default MeshSSSNodeMaterial;
/**
 * This node material is an experimental extension of {@link MeshPhysicalNodeMaterial}
 * that implements a Subsurface scattering (SSS) term.
 *
 * @augments MeshPhysicalNodeMaterial
 */
declare class MeshSSSNodeMaterial extends MeshPhysicalNodeMaterial {
    /**
     * Represents the thickness color.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    thicknessColorNode: Node<any> | null;
    /**
     * Represents the distortion factor.
     *
     * @type {?Node<float>}
     */
    thicknessDistortionNode: Node<any> | null;
    /**
     * Represents the thickness ambient factor.
     *
     * @type {?Node<float>}
     */
    thicknessAmbientNode: Node<any> | null;
    /**
     * Represents the thickness attenuation.
     *
     * @type {?Node<float>}
     */
    thicknessAttenuationNode: Node<any> | null;
    /**
     * Represents the thickness power.
     *
     * @type {?Node<float>}
     */
    thicknessPowerNode: Node<any> | null;
    /**
     * Represents the thickness scale.
     *
     * @type {?Node<float>}
     */
    thicknessScaleNode: Node<any> | null;
    /**
     * Whether the lighting model should use SSS or not.
     *
     * @type {boolean}
     * @default true
     */
    get useSSS(): boolean;
    /**
     * Setups the lighting model.
     *
     * @return {SSSLightingModel} The lighting model.
     */
    setupLightingModel(): SSSLightingModel;
}
import MeshPhysicalNodeMaterial from './MeshPhysicalNodeMaterial.js';
/**
 * Represents the lighting model for {@link MeshSSSNodeMaterial}.
 *
 * @augments PhysicalLightingModel
 */
declare class SSSLightingModel extends PhysicalLightingModel {
    /**
     * Whether the lighting model should use SSS or not.
     *
     * @type {boolean}
     * @default false
     */
    useSSS: boolean;
    /**
     * Extends the default implementation with a SSS term.
     *
     * Reference: [Approximating Translucency for a Fast, Cheap and Convincing Subsurface Scattering Look](https://colinbarrebrisebois.com/2011/03/07/gdc-2011-approximating-translucency-for-a-fast-cheap-and-convincing-subsurface-scattering-look/)
     *
     * @param {Object} input - The input data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object, builder: NodeBuilder): void;
}
import PhysicalLightingModel from '../../nodes/functions/PhysicalLightingModel.js';
