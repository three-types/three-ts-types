/**
 * A loader for the GCode format.
 *
 * GCode files are usually used for 3D printing or CNC applications.
 *
 * ```js
 * const loader = new GCodeLoader();
 * const object = await loader.loadAsync( 'models/gcode/benchy.gcode' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { GCodeLoader } from 'three/addons/loaders/GCodeLoader.js';
 */
export class GCodeLoader extends Loader {
    /**
     * Constructs a new GCode loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether to split layers or not.
     *
     * @type {boolean}
     * @default false
     */
    splitLayer: boolean;
    /**
     * Starts loading from the given URL and passes the loaded GCode asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given GCode data and returns a group with lines.
     *
     * @param {string} data - The raw Gcode data as a string.
     * @return {Group} The parsed GCode asset.
     */
    parse(data: string): Group;
}
import { Loader } from 'three';
import { Group } from 'three';
