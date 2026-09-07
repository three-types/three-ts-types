/**
 * A loader for the STL format, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files. The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 * - Binary decoding supports "Magics" color format (http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
 * - There is perhaps some question as to how valid it is to always assume little-endian-ness.
 * - ASCII decoding assumes file is UTF-8.
 *
 * ```js
 * const loader = new STLLoader();
 * const geometry = await loader.loadAsync( './models/stl/slotted_disk.stl' )
 * scene.add( new THREE.Mesh( geometry ) );
 * ```
 * For binary STLs geometry might contain colors for vertices. To use it:
 * ```js
 * // use the same code to load STL as above
 * if ( geometry.hasColors ) {
 * 	material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );
 * }
 * const mesh = new THREE.Mesh( geometry, material );
 * ```
 * For ASCII STLs containing multiple solids, each solid is assigned to a different group.
 * Groups can be used to assign a different color by defining an array of materials with the same length of
 * geometry.groups and passing it to the Mesh constructor:
 *
 * ```js
 * const materials = [];
 * const nGeometryGroups = geometry.groups.length;
 *
 * for ( let i = 0; i < nGeometryGroups; i ++ ) {
 * 	const material = new THREE.MeshPhongMaterial( { color: colorMap[ i ], wireframe: false } );
 * 	materials.push( material );
 * }
 *
 * const mesh = new THREE.Mesh(geometry, materials);
 * ```
 *
 * @augments Loader
 * @three_import import { STLLoader } from 'three/addons/loaders/STLLoader.js';
 */
export class STLLoader extends Loader {
    /**
     * Constructs a new STL loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded STL asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given STL data and returns the resulting geometry.
     *
     * @param {ArrayBuffer} data - The raw STL data as an array buffer.
     * @return {BufferGeometry} The parsed geometry.
     */
    parse(data: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
