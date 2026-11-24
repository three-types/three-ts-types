/**
 * A loader for the Draco format.
 *
 * [Draco](https://google.github.io/draco/) is an open source library for compressing
 * and decompressing 3D meshes and point clouds. Compressed geometry can be significantly smaller,
 * at the cost of additional decoding time on the client device.
 *
 * Standalone Draco files have a `.drc` extension, and contain vertex positions, normals, colors,
 * and other attributes. Draco files do not contain materials, textures, animation, or node hierarchies –
 * to use these features, embed Draco geometry inside of a glTF file. A normal glTF file can be converted
 * to a Draco-compressed glTF file using [glTF-Pipeline](https://github.com/CesiumGS/gltf-pipeline).
 * When using Draco with glTF, an instance of `DRACOLoader` will be used internally by {@link GLTFLoader}.
 *
 * It is recommended to create one DRACOLoader instance and reuse it to avoid loading and creating
 * multiple decoder instances.
 *
 * `DRACOLoader` will automatically use either the JS or the WASM decoding library, based on
 * browser capabilities.
 *
 * ```js
 * const loader = new DRACOLoader();
 * const geometry = await loader.loadAsync( 'models/draco/bunny.drc' );
 * geometry.computeVertexNormals(); // optional
 *
 * loader.dispose();
 * ```
 *
 * @augments Loader
 * @three_import import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
 */
export class DRACOLoader extends Loader {
    /**
     * Constructs a new Draco loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    decoderPaths: {
        js: string;
        wasm: string;
        dep_js: string;
    };
    decoderConfig: {};
    decoderBinary: any;
    decoderPending: Promise<void> | null;
    workerLimit: number;
    workerPool: any[];
    workerNextTaskID: number;
    workerSourceURL: string;
    defaultAttributeIDs: {
        position: string;
        normal: string;
        color: string;
        uv: string;
    };
    defaultAttributeTypes: {
        position: string;
        normal: string;
        color: string;
        uv: string;
    };
    /**
     * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
     *
     * @param {string|{js:string, wasm:string}} path - The decoder path, or a config object with explicit URLs for each decoder file.
     * @return {DRACOLoader} A reference to this loader.
     */
    setDecoderPath(path: string | {
        js: string;
        wasm: string;
    }): DRACOLoader;
    /**
     * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
     *
     * @deprecated
     * @param {{type:('js'|'wasm')}} config - The decoder config.
     * @return {DRACOLoader} A reference to this loader.
     */
    setDecoderConfig(config: {
        type: ("js" | "wasm");
    }): DRACOLoader;
    /**
     * Sets the maximum number of Web Workers to be used during decoding.
     * A lower limit may be preferable if workers are also for other tasks in the application.
     *
     * @param {number} workerLimit - The worker limit.
     * @return {DRACOLoader} A reference to this loader.
     */
    setWorkerLimit(workerLimit: number): DRACOLoader;
    /**
     * Starts loading from the given URL and passes the loaded Draco asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given Draco data.
     *
     * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    parse(buffer: ArrayBuffer, onLoad: (arg0: BufferGeometry) => any, onError?: onErrorCallback): void;
    decodeDracoFile(buffer: any, callback: any, attributeIDs: any, attributeTypes: any, vertexColorSpace?: string, onError?: () => void): any;
    decodeGeometry(buffer: any, taskConfig: any): any;
    _createGeometry(geometryData: any): BufferGeometry;
    _assignVertexColorSpace(attribute: any, inputColorSpace: any): void;
    _loadLibrary(url: any, responseType: any): Promise<any>;
    preload(): this;
    _initDecoder(): Promise<void>;
    _getWorker(taskID: any, taskCost: any): Promise<any>;
    _releaseTask(worker: any, taskID: any): void;
    debug(): void;
    dispose(): this;
}
export namespace DRACO_GLTF_CONFIG {
    let js: string;
    let wasm: string;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
