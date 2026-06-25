export default VolumeNodeMaterial;
/**
 * Volume node material.
 *
 * @augments NodeMaterial
 */
declare class VolumeNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new volume node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVolumeNodeMaterial: boolean;
    /**
     * Number of steps used for raymarching.
     *
     * @type {number}
     * @default 25
     */
    steps: number;
    /**
     * Offsets the distance a ray has been traveled through a volume.
     * Can be used to implement dithering to reduce banding.
     *
     * @type {Node<float>}
     * @default null
     */
    offsetNode: Node<float>;
    /**
     * Node used for scattering calculations.
     *
     * @type {Function|FunctionNode<vec4>}
     * @default null
     */
    scatteringNode: Function | FunctionNode<vec4>;
    side: number;
    setupLightingModel(): VolumetricLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import VolumetricLightingModel from '../../nodes/functions/VolumetricLightingModel.js';
