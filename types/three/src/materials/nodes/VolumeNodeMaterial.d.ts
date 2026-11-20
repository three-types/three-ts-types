import Node from "../../nodes/core/Node.js";
import VolumetricLightingModel from "../../nodes/functions/VolumetricLightingModel.js";
import { MapColorPropertiesToColorRepresentations, MaterialParameters, MaterialProperties } from "../Material.js";
import NodeMaterial, { NodeMaterialNodeProperties } from "./NodeMaterial.js";

export interface VolumeNodeMaterialNodeProperties extends NodeMaterialNodeProperties {
    /**
     * Number of steps used for raymarching.
     *
     * @default 25
     */
    steps: number;
    /**
     * Offsets the distance a ray has been traveled through a volume, as a
     * fraction of one raymarching step. Can be used to implement dithering
     * (e.g. per-pixel noise in the range `[0,1)`) to reduce banding.
     *
     * @default null
     */
    offsetNode: Node | null;
    /**
     * Function used for scattering calculations. It receives `{ positionRay }`,
     * the current ray position in world space, and returns the scattering
     * density for that raymarching step.
     *
     * @default null
     */
    scatteringNode: (params: { positionRay: Node<"vec3"> }) => Node | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VolumeNodeMaterialParameters
    extends Partial<MapColorPropertiesToColorRepresentations<VolumeNodeMaterialNodeProperties>>, MaterialParameters
{}

/**
 * Volume node material. Renders a raymarched volume that is only lit by
 * point, spot and rect area lights; directional, ambient and environment
 * lighting are ignored.
 *
 * If {@link NodeMaterial#depthNode} is set, it is interpreted as the scene
 * depth used to occlude the rays.
 */
declare class VolumeNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new volume node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: VolumeNodeMaterialParameters);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isVolumeNodeMaterial: boolean;
    setValues(values?: VolumeNodeMaterialParameters): void;
    setupLightingModel(): VolumetricLightingModel;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VolumeNodeMaterial extends VolumeNodeMaterialNodeProperties, MaterialProperties {}

export default VolumeNodeMaterial;
