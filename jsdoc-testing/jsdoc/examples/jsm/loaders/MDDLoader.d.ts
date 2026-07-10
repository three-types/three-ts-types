/**
 * A loader for the MDD format.
 *
 * MDD stores a position for every vertex in a model for every frame in an animation.
 * Similar to BVH, it can be used to transfer animation data between different 3D applications or engines.
 *
 * MDD stores its data in binary format (big endian) in the following way:
 *
 * - number of frames (a single uint32)
 * - number of vertices (a single uint32)
 * - time values for each frame (sequence of float32)
 * - vertex data for each frame (sequence of float32)
 *
 * ```js
 * const loader = new MDDLoader();
 * const result = await loader.loadAsync( 'models/mdd/cube.mdd' );
 *
 * const morphTargets = result.morphTargets;
 * const clip = result.clip;
 * // clip.optimize(); // optional
 *
 * const geometry = new THREE.BoxGeometry();
 * geometry.morphAttributes.position = morphTargets; // apply morph targets (vertex data must match)
 *
 * const material = new THREE.MeshBasicMaterial();
 *
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 *
 * const mixer = new THREE.AnimationMixer( mesh );
 * mixer.clipAction( clip ).play();
 * ```
 *
 * @augments Loader
 * @three_import import { MDDLoader } from 'three/addons/loaders/MDDLoader.js';
 */
export class MDDLoader extends Loader {
    /**
     * Constructs a new MDD loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded MDD asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({clip:AnimationClip, morphTargets:Array<BufferAttribute>})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        clip: AnimationClip;
        morphTargets: Array<BufferAttribute>;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given MDD data and returns an object holding the animation clip and the respective
     * morph targets.
     *
     * @param {ArrayBuffer} data - The raw XYZ data as an array buffer.
     * @return {{clip:AnimationClip, morphTargets:Array<BufferAttribute>}} The result object.
     */
    parse(data: ArrayBuffer): {
        clip: AnimationClip;
        morphTargets: Array<BufferAttribute>;
    };
}
import { Loader } from 'three';
import { AnimationClip } from 'three';
import { BufferAttribute } from 'three';
