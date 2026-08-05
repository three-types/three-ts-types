/**
 * A loader for the PDB format.
 *
 * The [Protein Data Bank](https://en.wikipedia.org/wiki/Protein_Data_Bank_(file_format))
 * file format is a textual file describing the three-dimensional structures of molecules.
 *
 * ```js
 * const loader = new PDBLoader();
 * const pdb = await loader.loadAsync( 'models/pdb/ethanol.pdb' );
 *
 * const geometryAtoms = pdb.geometryAtoms;
 * const geometryBonds = pdb.geometryBonds;
 * const json = pdb.json;
 * ```
 *
 * @augments Loader
 * @three_import import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
 */
export class PDBLoader extends Loader {
    /**
     * Constructs a new PDB loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded PDB asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Object) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given PDB data and returns an object holding the atoms and
     * bond geometries as well as the raw atom data as JSON.
     *
     * @param {string} text - The raw PDB data as a string.
     * @return {Object} The result object.
     */
    parse(text: string): Object;
}
import { Loader } from 'three';
