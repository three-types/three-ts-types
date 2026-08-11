/**
 * A mesh that has a {@link Skeleton} that can then be used to animate the
 * vertices of the geometry with skinning/skeleton animation.
 *
 * Next to a valid skeleton, the skinned mesh requires skin indices and weights
 * as buffer attributes in its geometry. These attribute define which bones affect a single
 * vertex to a certain extend.
 *
 * Typically skinned meshes are not created manually but loaders like {@link GLTFLoader}
 * or {@link FBXLoader } import respective models.
 *
 * @augments Mesh
 * @demo scenes/bones-browser.html
 */
export class SkinnedMesh extends Mesh {
    /**
     * Constructs a new skinned mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSkinnedMesh: boolean;
    /**
     * `AttachedBindMode` means the skinned mesh shares the same world space as the skeleton.
     * This is not true when using `DetachedBindMode` which is useful when sharing a skeleton
     * across multiple skinned meshes.
     *
     * @type {(AttachedBindMode|DetachedBindMode)}
     * @default AttachedBindMode
     */
    bindMode: (string | string);
    /**
     * The base matrix that is used for the bound bone transforms.
     *
     * @type {Matrix4}
     */
    bindMatrix: Matrix4;
    /**
     * The base matrix that is used for resetting the bound bone transforms.
     *
     * @type {Matrix4}
     */
    bindMatrixInverse: Matrix4;
    /**
     * The bounding box of the skinned mesh. Can be computed via {@link SkinnedMesh#computeBoundingBox}.
     *
     * @type {?Box3}
     * @default null
     */
    boundingBox: Box3 | null;
    /**
     * The bounding sphere of the skinned mesh. Can be computed via {@link SkinnedMesh#computeBoundingSphere}.
     *
     * @type {?Sphere}
     * @default null
     */
    boundingSphere: Sphere | null;
    /**
     * Computes the bounding box of the skinned mesh, and updates {@link SkinnedMesh#boundingBox}.
     * The bounding box is not automatically computed by the engine; this method must be called by your app.
     * If the skinned mesh is animated, the bounding box should be recomputed per frame in order to reflect
     * the current animation state.
     */
    computeBoundingBox(): void;
    /**
     * Computes the bounding sphere of the skinned mesh, and updates {@link SkinnedMesh#boundingSphere}.
     * The bounding sphere is automatically computed by the engine once when it is needed, e.g., for ray casting
     * and view frustum culling. If the skinned mesh is animated, the bounding sphere should be recomputed
     * per frame in order to reflect the current animation state.
     */
    computeBoundingSphere(): void;
    copy(source: any, recursive: any): this;
    skeleton: any;
    raycast(raycaster: any, intersects: any): void;
    getVertexPosition(index: any, target: any): any;
    /**
     * Binds the given skeleton to the skinned mesh.
     *
     * @param {Skeleton} skeleton - The skeleton to bind.
     * @param {Matrix4} [bindMatrix] - The bind matrix. If no bind matrix is provided,
     * the skinned mesh's world matrix will be used instead.
     */
    bind(skeleton: Skeleton, bindMatrix?: Matrix4): void;
    /**
     * This method sets the skinned mesh in the rest pose).
     */
    pose(): void;
    /**
     * Normalizes the skin weights which are defined as a buffer attribute
     * in the skinned mesh's geometry.
     */
    normalizeSkinWeights(): void;
    updateMatrixWorld(force: any): void;
    /**
     * Applies the bone transform associated with the given index to the given
     * vector. Can be used to transform positions or direction vectors by providing
     * a Vector4 with 1 or 0 in the w component respectively. Returns the updated vector.
     *
     * @param {number} index - The vertex index.
     * @param {Vector3|Vector4} target - The target object that is used to store the method's result.
     * @return {Vector3|Vector4} The updated vertex attribute data.
     */
    applyBoneTransform(index: number, target: Vector3 | Vector4): Vector3 | Vector4;
}
import { Mesh } from './Mesh.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Box3 } from '../math/Box3.js';
import { Sphere } from '../math/Sphere.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4.js';
