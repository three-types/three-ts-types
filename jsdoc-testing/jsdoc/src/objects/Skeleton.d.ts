/**
 * Class for representing the armatures in `three.js`. The skeleton
 * is defined by a hierarchy of bones.
 *
 * ```js
 * const bones = [];
 *
 * const shoulder = new THREE.Bone();
 * const elbow = new THREE.Bone();
 * const hand = new THREE.Bone();
 *
 * shoulder.add( elbow );
 * elbow.add( hand );
 *
 * bones.push( shoulder , elbow, hand);
 *
 * shoulder.position.y = -5;
 * elbow.position.y = 0;
 * hand.position.y = 5;
 *
 * const armSkeleton = new THREE.Skeleton( bones );
 * ```
 */
export class Skeleton {
    /**
     * Constructs a new skeleton.
     *
     * @param {Array<Bone>} [bones] - An array of bones.
     * @param {Array<Matrix4>} [boneInverses] - An array of bone inverse matrices.
     * If not provided, these matrices will be computed automatically via {@link Skeleton#calculateInverses}.
     */
    constructor(bones?: Array<Bone>, boneInverses?: Array<Matrix4>);
    uuid: string;
    /**
     * An array of bones defining the skeleton.
     *
     * @type {Array<Bone>}
     */
    bones: Array<Bone>;
    /**
     * An array of bone inverse matrices.
     *
     * @type {Array<Matrix4>}
     */
    boneInverses: Array<Matrix4>;
    /**
     * An array buffer holding the bone data.
     * Input data for {@link Skeleton#boneTexture}.
     *
     * @type {?Float32Array}
     * @default null
     */
    boneMatrices: Float32Array | null;
    /**
     * An array buffer holding the bone data of the previous frame.
     * Required for computing velocity. Maintained in {@link SkinningNode}.
     *
     * @type {?Float32Array}
     * @default null
     */
    previousBoneMatrices: Float32Array | null;
    /**
     * A texture holding the bone data for use
     * in the vertex shader.
     *
     * @type {?DataTexture}
     * @default null
     */
    boneTexture: DataTexture | null;
    /**
     * Initializes the skeleton. This method gets automatically called by the constructor
     * but depending on how the skeleton is created it might be necessary to call this method
     * manually.
     */
    init(): void;
    /**
     * Computes the bone inverse matrices. This method resets {@link Skeleton#boneInverses}
     * and fills it with new matrices.
     */
    calculateInverses(): void;
    /**
     * Resets the skeleton to the base pose.
     */
    pose(): void;
    /**
     * Resets the skeleton to the base pose.
     */
    update(): void;
    /**
     * Returns a new skeleton with copied values from this instance.
     *
     * @return {Skeleton} A clone of this instance.
     */
    clone(): Skeleton;
    /**
     * Computes a data texture for passing bone data to the vertex shader.
     *
     * @return {Skeleton} A reference of this instance.
     */
    computeBoneTexture(): Skeleton;
    /**
     * Searches through the skeleton's bone array and returns the first with a
     * matching name.
     *
     * @param {string} name - The name of the bone.
     * @return {Bone|undefined} The found bone. `undefined` if no bone has been found.
     */
    getBoneByName(name: string): Bone | undefined;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
    /**
     * Setups the skeleton by the given JSON and bones.
     *
     * @param {Object} json - The skeleton as serialized JSON.
     * @param {Object<string, Bone>} bones - An array of bones.
     * @return {Skeleton} A reference of this instance.
     */
    fromJSON(json: Object, bones: {
        [x: string]: Bone;
    }): Skeleton;
    /**
     * Serializes the skeleton into JSON.
     *
     * @return {Object} A JSON object representing the serialized skeleton.
     * @see {@link ObjectLoader#parse}
     */
    toJSON(): Object;
}
import { Bone } from './Bone.js';
import { Matrix4 } from '../math/Matrix4.js';
import { DataTexture } from '../textures/DataTexture.js';
