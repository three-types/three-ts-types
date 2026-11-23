export default VolumeNodeMaterial;
/**
 * Volume node material. Renders a raymarched volume that is only lit by
 * point, spot and rect area lights; directional, ambient and environment
 * lighting are ignored.
 *
 * If {@link NodeMaterial#depthNode} is set, it is interpreted as the scene
 * depth used to occlude the rays.
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
     * Offsets the distance a ray has been traveled through a volume, as a
     * fraction of one raymarching step. Can be used to implement dithering
     * (e.g. per-pixel noise in the range `[0,1)`) to reduce banding.
     *
     * @type {?Node<float>}
     * @default null
     */
    offsetNode: Node<float> | null;
    /**
     * Function used for scattering calculations. It receives `{ positionRay }`,
     * the current ray position in world space, and returns the scattering
     * density for that raymarching step.
     *
     * @type {?(Function|FunctionNode)}
     * @default null
     */
    scatteringNode: (Function | FunctionNode) | null;
    side: number;
    setupLightingModel(): VolumetricLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import VolumetricLightingModel from '../../nodes/functions/VolumetricLightingModel.js';
