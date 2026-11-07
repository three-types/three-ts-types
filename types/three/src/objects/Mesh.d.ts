import { BufferGeometry } from "../core/BufferGeometry.js";
import { JSONMeta, Object3D, Object3DEventMap, Object3DJSON, Object3DJSONObject } from "../core/Object3D.js";
import { Intersection, Raycaster } from "../core/Raycaster.js";
import { Material } from "../materials/Material.js";
import { Frustum } from "../math/Frustum.js";
import { FrustumArray } from "../math/FrustumArray.js";
import { Vector3 } from "../math/Vector3.js";

export interface MeshJSONObject extends Object3DJSONObject {
    geometry: string;
}

export interface MeshJSON extends Object3DJSON {
    object: MeshJSONObject;
}

/**
 * Class representing triangular polygon mesh based objects.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments Object3D
 */
export class Mesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
    TEventMap extends Object3DEventMap = Object3DEventMap,
> extends Object3D<TEventMap> {
    /**
     * Constructs a new mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(geometry?: TGeometry, material?: TMaterial);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMesh: true;
    /**
     * The mesh geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: TGeometry;
    /**
     * The mesh material.
     *
     * @type {Material|Array<Material>}
     * @default MeshBasicMaterial
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
    /**
     * The number of instances of this mesh.
     * Can only be used with {@link WebGPURenderer}.
     *
     * @type {number}
     * @default 1
     */
    count: number;
    copy(source: Mesh, recursive?: boolean): this;
    /**
     * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
     * to make sure existing morph targets can influence this 3D object.
     */
    updateMorphTargets(): void;
    /**
     * Returns the local-space position of the vertex at the given index, taking into
     * account the current animation state of both morph targets and skinning.
     *
     * @param {number} index - The vertex index.
     * @param {Vector3} target - The target object that is used to store the method's result.
     * @return {Vector3} The vertex position in local space.
     */
    getVertexPosition(index: number, target: Vector3): Vector3;
    /**
     * Returns `true` if this mesh intersects the given frustum.
     *
     * @param {Frustum|FrustumArray} frustum - The frustum to test.
     * @return {boolean} Whether this mesh intersects the given frustum or not.
     */
    intersectsFrustum(frustum: Frustum | FrustumArray): boolean;
    /**
     * Computes intersection points between a casted ray and this line.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    toJSON(meta?: JSONMeta): MeshJSON;
}
