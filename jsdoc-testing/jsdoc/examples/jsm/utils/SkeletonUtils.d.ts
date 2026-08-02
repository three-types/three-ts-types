/**
 * :SkeletonUtils~RetargetOptions
 */
export type module = {
    /**
     * - Whether to use the position of the first frame or not.
     */
    useFirstFramePosition?: boolean | undefined;
    /**
     * - The FPS of the clip.
     */
    fps?: number | undefined;
    /**
     * - A dictionary for mapping target to source bone names.
     */
    names?: {
        [x: string]: string;
    } | undefined;
    /**
     * - A function for mapping bone names. Alternative to `names`.
     */
    getBoneName?: ((arg0: string) => string) | undefined;
    /**
     * - Whether to trim the clip or not. If set the array should hold two values for the start and end.
     */
    trim?: number[] | undefined;
    /**
     * - Whether to preserve bone matrices or not.
     */
    preserveBoneMatrix?: boolean | undefined;
    /**
     * - Whether to preserve bone positions or not.
     */
    preserveBonePositions?: boolean | undefined;
    /**
     * - Whether to use the target matrix or not.
     */
    useTargetMatrix?: boolean | undefined;
    /**
     * - The name of the source's hip bone.
     */
    hip?: string | undefined;
    /**
     * - The hip influence.
     */
    hipInfluence?: Vector3 | undefined;
    /**
     * - The scale.
     */
    scale?: number | undefined;
    /**
     * - Per-bone local offset matrices, keyed by bone name.
     */
    localOffsets?: {
        [x: string]: Matrix4;
    } | undefined;
    /**
     * - An additional position offset applied to the hip bone.
     */
    hipPosition?: Vector3 | undefined;
};
/**
 * Retargets the skeleton from the given source to the target.
 *
 * Both `target` and `source` can be a 3D object with a skeleton property (e.g. a skinned mesh)
 * or a {@link Skeleton} directly.
 *
 * @param {Object3D|Skeleton} target - The target object.
 * @param {Object3D|Skeleton} source - The source object.
 * @param {module:SkeletonUtils~RetargetOptions} options - The options.
 */
export function retarget(target: Object3D | Skeleton, source: Object3D | Skeleton, options?: any): void;
/**
 * Retargets the animation clip of the source to the target 3D object.
 *
 * The `source` can be a 3D object with a skeleton property (e.g. a skinned mesh)
 * or a {@link Skeleton} directly.
 *
 * @param {Object3D} target - The target 3D object. Must have a `skeleton` property.
 * @param {Object3D|Skeleton} source - The source object.
 * @param {AnimationClip} clip - The animation clip.
 * @param {module:SkeletonUtils~RetargetOptions} options - The options.
 * @return {AnimationClip} The retargeted animation clip.
 */
export function retargetClip(target: Object3D, source: Object3D | Skeleton, clip: AnimationClip, options?: any): AnimationClip;
/**
 * Clones the given 3D object and its descendants, ensuring that any `SkinnedMesh` instances are
 * correctly associated with their bones. Bones are also cloned, and must be descendants of the
 * object passed to this method. Other data, like geometries and materials, are reused by reference.
 *
 * @param {Object3D} source - The 3D object to clone.
 * @return {Object3D} The cloned 3D object.
 */
export function clone(source: Object3D): Object3D;
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
import { AnimationClip } from 'three';
