/**
 * A loader for Rhinoceros 3D files and objects.
 *
 * Rhinoceros is a 3D modeler used to create, edit, analyze, document, render,
 * animate, and translate NURBS curves, surfaces, breps, extrusions, point clouds,
 * as well as polygon meshes and SubD objects. `rhino3dm.js` is compiled to WebAssembly
 * from the open source geometry library `openNURBS`. The loader currently uses
 * `rhino3dm.js 8.4.0`.
 *
 * ```js
 * const loader = new Rhino3dmLoader();
 * loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1' );
 *
 * const object = await loader.loadAsync( 'models/3dm/Rhino_Logo.3dm' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';
 */
export class Rhino3dmLoader extends Loader {
    /**
     * Constructs a new Rhino 3DM loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    libraryPath: string;
    libraryPending: Promise<void> | null;
    libraryBinary: any;
    libraryConfig: {};
    url: string;
    workerLimit: number;
    workerPool: any[];
    workerNextTaskID: number;
    workerSourceURL: string;
    workerConfig: {};
    materials: any[];
    warnings: any[];
    /**
     * Path to a folder containing the JS and WASM libraries.
     *
     * @param {string} path - The library path to set.
     * @return {Rhino3dmLoader} A reference to this loader.
     */
    setLibraryPath(path: string): Rhino3dmLoader;
    /**
     * Sets the maximum number of Web Workers to be used during decoding.
     * A lower limit may be preferable if workers are also for other
     * tasks in the application.
     *
     * @param {number} workerLimit - The worker limit.
     * @return {Rhino3dmLoader} A reference to this loader.
     */
    setWorkerLimit(workerLimit: number): Rhino3dmLoader;
    /**
     * Starts loading from the given URL and passes the loaded 3DM asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object3D)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Object3D) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Prints debug messages to the browser console.
     */
    debug(): void;
    /**
     * Decodes the 3DM asset data with a Web Worker.
     *
     * @param {ArrayBuffer} buffer - The raw 3DM asset data as an array buffer.
     * @param {string} url - The asset URL.
     * @return {Promise<Object3D>} A Promise that resolved with the decoded 3D object.
     */
    decodeObjects(buffer: ArrayBuffer, url: string): Promise<Object3D>;
    /**
     * Parses the given 3DM data and passes the loaded 3DM asset
     * to the `onLoad()` callback.
     *
     * @param {ArrayBuffer} data - The raw 3DM asset data as an array buffer.
     * @param {function(Object3D)} onLoad - Executed when the loading process has been finished.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    parse(data: ArrayBuffer, onLoad: (arg0: Object3D) => any, onError: onErrorCallback): void;
    _compareMaterials(material: any): any;
    _createMaterial(material: any, renderEnvironment: any): MeshStandardMaterial;
    _createGeometry(data: any): Object3D;
    _createObject(obj: any, mat: any): Sprite | Mesh | Line | Points | SpotLight | PointLight | DirectionalLight | RectAreaLight | undefined;
    _initLibrary(): Promise<void>;
    _getWorker(taskCost: any): Promise<any>;
    _releaseTask(worker: any, taskID: any): void;
    /**
     * Frees internal resources. This method should be called
     * when the loader is no longer required.
     */
    dispose(): void;
}
import { Loader } from 'three';
import { Object3D } from 'three';
import { MeshStandardMaterial } from 'three';
import { Sprite } from 'three';
import { Mesh } from 'three';
import { Line } from 'three';
import { Points } from 'three';
import { SpotLight } from 'three';
import { PointLight } from 'three';
import { DirectionalLight } from 'three';
import { RectAreaLight } from 'three';
