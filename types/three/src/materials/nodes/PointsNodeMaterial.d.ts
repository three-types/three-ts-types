import Node from "../../nodes/core/Node.js";
import { MapColorPropertiesToColorRepresentations } from "../Material.js";
import { PointsMaterialParameters, PointsMaterialProperties } from "../PointsMaterial.js";
import SpriteNodeMaterial, { SpriteNodeMaterialNodeProperties } from "./SpriteNodeMaterial.js";

export interface PointsNodeMaterialNodeProperties extends SpriteNodeMaterialNodeProperties {
    /**
     * This node property allows to overwrite the point size defined by `size`. The size
     * is in pixels, additionally scaled by distance when `sizeAttenuation` is `true`.
     *
     * Note that `WebGPURenderer` always renders point primitives with a size of 1 pixel (with
     * both backends). Consequently, this node has no effect when the material is used with
     * {@link Points}. If an application wants to render points with a size larger than 1 pixel,
     * the material should be used with {@link Sprite} and instancing.
     *
     * @default null
     */
    sizeNode: Node;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PointsNodeMaterialParameters
    extends
        Partial<MapColorPropertiesToColorRepresentations<PointsNodeMaterialNodeProperties>>,
        PointsMaterialParameters
{}

/**
 * Node material version of {@link PointsMaterial}.
 *
 * This material can be used in two ways:
 *
 * - By rendering point primitives with {@link Points}. Since WebGPU only supports point primitives
 * with a pixel size of `1`, it's not possible to define a size.
 *
 * ```js
 * const pointCloud = new THREE.Points( geometry, new THREE.PointsNodeMaterial() );
 * ```
 *
 * - By rendering instanced quads with {@link Sprite}. In this case, size is honored,
 * see {@link PointsNodeMaterial#sizeNode}. Set {@link Sprite#count} to the number of points.
 *
 * ```js
 * const instancedPoints = new THREE.Sprite( new THREE.PointsNodeMaterial( { positionNode: instancedBufferAttribute( positionAttribute ) } ) );
 * instancedPoints.count = positionAttribute.count;
 * ```
 */
declare class PointsNodeMaterial extends SpriteNodeMaterial {
    constructor(parameters?: PointsNodeMaterialParameters);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isPointsNodeMaterial: boolean;
    setValues(values?: PointsNodeMaterialParameters): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PointsNodeMaterial extends PointsNodeMaterialNodeProperties, PointsMaterialProperties {}

export default PointsNodeMaterial;
