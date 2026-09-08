/**
 * A loader for the BVH format.
 *
 * Imports BVH files and outputs a single {@link Skeleton} and {@link AnimationClip}.
 * The loader only supports BVH files containing a single root right now.
 *
 * ```js
 * const loader = new BVHLoader();
 * const result = await loader.loadAsync( 'models/bvh/pirouette.bvh' );
 *
 * // visualize skeleton
 * const skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
 * scene.add( result.skeleton.bones[ 0 ] );
 * scene.add( skeletonHelper );
 *
 * // play animation clip
 * mixer = new THREE.AnimationMixer( result.skeleton.bones[ 0 ] );
 * mixer.clipAction( result.clip ).play();
 * ```
 *
 * @augments Loader
 * @three_import import { BVHLoader } from 'three/addons/loaders/BVHLoader.js';
 */
export class BVHLoader extends Loader {
    /**
     * Constructs a new BVH loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether to animate bone positions or not.
     *
     * @type {boolean}
     * @default true
     */
    animateBonePositions: boolean;
    /**
     * Whether to animate bone rotations or not.
     *
     * @type {boolean}
     * @default true
     */
    animateBoneRotations: boolean;
    /**
     * Starts loading from the given URL and passes the loaded BVH asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({skeleton:Skeleton,clip:AnimationClip})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        skeleton: Skeleton;
        clip: AnimationClip;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given BVH data and returns the resulting data.
     *
     * @param {string} text - The raw BVH data as a string.
     * @return {{skeleton:Skeleton,clip:AnimationClip}} An object representing the parsed asset.
     */
    parse(text: string): {
        skeleton: Skeleton;
        clip: AnimationClip;
    };
}
import { Loader } from 'three';
import { Skeleton } from 'three';
import { AnimationClip } from 'three';
