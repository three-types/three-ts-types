import { BufferGeometry, NormalOrGLBufferAttributes } from "../core/BufferGeometry.js";
import { Object3D, Object3DEventMap } from "../core/Object3D.js";
import { Intersection, Raycaster } from "../core/Raycaster.js";
import { Material } from "../materials/Material.js";
import { Frustum } from "../math/Frustum.js";
import { FrustumArray } from "../math/FrustumArray.js";

/**
 * A class for displaying points or point clouds.
 *
 * @augments Object3D
 */
export class Points<
    TGeometry extends BufferGeometry<NormalOrGLBufferAttributes> = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
    TEventMap extends Object3DEventMap = Object3DEventMap,
> extends Object3D<TEventMap> {
    /**
     * Constructs a new point cloud.
     *
     * @param {BufferGeometry} [geometry] - The points geometry.
     * @param {Material|Array<Material>} [material] - The points material.
     */
    constructor(geometry?: TGeometry, material?: TMaterial);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPoints: true;
    /**
     * The points geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: TGeometry;
    /**
     * The line material.
     *
     * @type {Material|Array<Material>}
     * @default PointsMaterial
     */
    material: TMaterial;
    /**
     * A dictionary representing the morph targets in the geometry. The key is the
     * morph targets name, the value its attribute index. This member is `undefined`
     * by default and only set when morph targets are detected in the geometry.
     *
     * @type {Object<string,number>|undefined}
     * @default undefined
     */
    morphTargetDictionary: {
        [x: string]: number;
    } | undefined;
    /**
     * An array of weights typically in the range `[0,1]` that specify how much of the morph
     * is applied. This member is `undefined` by default and only set when morph targets are
     * detected in the geometry.
     *
     * @type {Array<number>|undefined}
     * @default undefined
     */
    morphTargetInfluences: Array<number> | undefined;
    copy(source: Points, recursive?: boolean): this;
    /**
     * Returns `true` if this point cloud intersects the given frustum.
     *
     * @param {Frustum|FrustumArray} frustum - The frustum to test.
     * @return {boolean} Whether this point cloud intersects the given frustum or not.
     */
    intersectsFrustum(frustum: Frustum | FrustumArray): boolean;
    /**
     * Computes intersection points between a casted ray and this point cloud.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    /**
     * Sets the values of {@link Points#morphTargetDictionary} and {@link Points#morphTargetInfluences}
     * to make sure existing morph targets can influence this 3D object.
     */
    updateMorphTargets(): void;
}
