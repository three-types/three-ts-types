/**
 * A loader for the Point Cloud Data (PCD) format.
 *
 * PCDLoader supports ASCII and (compressed) binary files as well as the following PCD fields:
 * - x y z
 * - rgb
 * - normal_x normal_y normal_z
 * - intensity
 * - label
 *
 * ```js
 * const loader = new PCDLoader();
 *
 * const points = await loader.loadAsync( './models/pcd/binary/Zaghetto.pcd' );
 * points.geometry.center(); // optional
 * points.geometry.rotateX( Math.PI ); // optional
 * scene.add( points );
 * ```
 *
 * @augments Loader
 * @three_import import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
 */
export class PCDLoader extends Loader {
    /**
     * Constructs a new PCD loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether to use little Endian or not.
     *
     * @type {boolean}
     * @default true
     */
    littleEndian: boolean;
    /**
     * Starts loading from the given URL and passes the loaded PCD asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Points)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Points) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Get dataview value by field type and size.
     *
     * @private
     * @param {DataView} dataview - The DataView to read from.
     * @param {number} offset - The offset to start reading from.
     * @param {'F' | 'U' | 'I'} type - Field type.
     * @param {number} size - Field size.
     * @returns {number} Field value.
     */
    private _getDataView;
    /**
     * Parses the given PCD data and returns a point cloud.
     *
     * @param {ArrayBuffer} data - The raw PCD data as an array buffer.
     * @return {Points} The parsed point cloud.
     */
    parse(data: ArrayBuffer): Points;
}
import { Loader } from 'three';
import { Points } from 'three';
