/**
 * A helper object to assist with visualizing a {@link Skeleton}.
 *
 * ```js
 * const helper = new THREE.SkeletonHelper( skinnedMesh );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 */
export class SkeletonHelper extends LineSegments {
    /**
     * Constructs a new skeleton helper.
     *
     * @param {Object3D} object -  Usually an instance of {@link SkinnedMesh}. However, any 3D object
     * can be used if it represents a hierarchy of bones (see {@link Bone}).
     */
    constructor(object: Object3D);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSkeletonHelper: boolean;
    /**
     * The object being visualized.
     *
     * @type {Object3D}
     */
    root: Object3D;
    /**
     * The list of bones that the helper visualizes.
     *
     * @type {Array<Bone>}
     */
    bones: Array<Bone>;
    matrix: any;
    updateMatrixWorld(force: any): void;
    /**
     * Defines the colors of the helper.
     *
     * @param {Color} color1 - The first line color for each bone.
     * @param {Color} color2 - The second line color for each bone.
     * @return {SkeletonHelper} A reference to this helper.
     */
    setColors(color1: Color, color2: Color): SkeletonHelper;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { LineSegments } from '../objects/LineSegments.js';
import { Color } from '../math/Color.js';
