/**
 * A loader for KTX 2.0 GPU Texture containers.
 *
 * KTX 2.0 is a container format for various GPU texture formats. The loader supports Basis Universal GPU textures,
 * which can be quickly transcoded to a wide variety of GPU texture compression formats. While KTX 2.0 also allows
 * other hardware-specific formats, this loader does not yet parse them.
 *
 * This loader parses the KTX 2.0 container and transcodes to a supported GPU compressed texture format.
 * The required WASM transcoder and JS wrapper are available from the `examples/jsm/libs/basis` directory.
 *
 * This loader relies on Web Assembly which is not supported in older browsers.
 *
 * References:
 * - [KTX specification](http://github.khronos.org/KTX-Specification/)
 * - [DFD](https://www.khronos.org/registry/DataFormat/specs/1.3/dataformat.1.3.html#basicdescriptor)
 * - [BasisU HDR](https://github.com/BinomialLLC/basis_universal/wiki/UASTC-HDR-Texture-Specification-v1.0)
 *
 * ```js
 * const loader = new KTX2Loader();
 * loader.setTranscoderPath( 'examples/jsm/libs/basis/' );
 * loader.detectSupport( renderer );
 * const texture = loader.loadAsync( 'diffuse.ktx2' );
 * ```
 *
 * @augments Loader
 * @three_import import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
 */
export class KTX2Loader extends Loader {
    /**
     * Constructs a new KTX2 loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    transcoderPath: string;
    transcoderBinary: any;
    transcoderPending: Promise<void> | null;
    workerPool: WorkerPool;
    workerSourceURL: string;
    workerConfig: {
        astcSupported: any;
        astcHDRSupported: boolean;
        etc1Supported: any;
        etc2Supported: any;
        dxtSupported: any;
        bptcSupported: any;
        pvrtcSupported: any;
    } | {
        astcSupported: any;
        astcHDRSupported: any;
        etc1Supported: any;
        etc2Supported: any;
        dxtSupported: any;
        bptcSupported: any;
        pvrtcSupported: any;
    } | null;
    /**
     * Sets the transcoder path to optionally set the decoder load path from a CDN.
     *
     * By default The WASM transcoder and JS wrapper are loaded from the `examples/jsm/libs/basis` directory.
     *
     * @param {string} path - The transcoder path to set.
     * @return {KTX2Loader} A reference to this loader.
     */
    setTranscoderPath(path: string): KTX2Loader;
    /**
     * Sets the maximum number of Web Workers to be allocated by this instance.
     *
     * @param {number} workerLimit - The worker limit.
     * @return {KTX2Loader} A reference to this loader.
     */
    setWorkerLimit(workerLimit: number): KTX2Loader;
    /**
     * Async version of {@link KTX2Loader#detectSupport}.
     *
     * @async
     * @deprecated
     * @param {WebGPURenderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the support has been detected.
     */
    detectSupportAsync(renderer: WebGPURenderer): Promise<any>;
    /**
     * Detects hardware support for available compressed texture formats, to determine
     * the output format for the transcoder. Must be called before loading a texture.
     *
     * @param {WebGPURenderer|WebGLRenderer} renderer - The renderer.
     * @return {KTX2Loader} A reference to this loader.
     */
    detectSupport(renderer: WebGPURenderer | WebGLRenderer): KTX2Loader;
    init(): Promise<void>;
    /**
     * Starts loading from the given URL and passes the loaded KTX2 texture
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(CompressedTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: CompressedTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given KTX2 data.
     *
     * @param {ArrayBuffer} buffer - The raw KTX2 data as an array buffer.
     * @param {function(CompressedTexture)} onLoad - Executed when the loading/parsing process has been finished.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @returns {Promise} A Promise that resolves when the parsing has been finished.
     */
    parse(buffer: ArrayBuffer, onLoad: (arg0: CompressedTexture) => any, onError: onErrorCallback): Promise<any>;
    _createTextureFrom(transcodeResult: any, container: any): CompressedTexture | Promise<never>;
    /**
     * @private
     * @param {ArrayBuffer} buffer
     * @param {?Object} config
     * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
     */
    private _createTexture;
    /**
     * Frees internal resources. This method should be called
     * when the loader is no longer required.
     */
    dispose(): void;
}
export namespace KTX2Loader {
    namespace BasisFormat {
        let ETC1S: number;
        let UASTC: number;
        let UASTC_HDR: number;
    }
    namespace TranscoderFormat {
        let ETC1: number;
        let ETC2: number;
        let BC1: number;
        let BC3: number;
        let BC4: number;
        let BC5: number;
        let BC7_M6_OPAQUE_ONLY: number;
        let BC7_M5: number;
        let PVRTC1_4_RGB: number;
        let PVRTC1_4_RGBA: number;
        let ASTC_4x4: number;
        let ATC_RGB: number;
        let ATC_RGBA_INTERPOLATED_ALPHA: number;
        let RGBA32: number;
        let RGB565: number;
        let BGR565: number;
        let RGBA4444: number;
        let BC6H: number;
        let RGB_HALF: number;
        let RGBA_HALF: number;
    }
    namespace EngineFormat {
        export { RGBAFormat };
        export { RGBA_ASTC_4x4_Format };
        export { RGB_BPTC_UNSIGNED_Format };
        export { RGBA_BPTC_Format };
        export { RGBA_ETC2_EAC_Format };
        export { RGBA_PVRTC_4BPPV1_Format };
        export { RGBA_S3TC_DXT5_Format };
        export { RGB_ETC1_Format };
        export { RGB_ETC2_Format };
        export { RGB_PVRTC_4BPPV1_Format };
        export { RGBA_S3TC_DXT1_Format };
    }
    namespace EngineType {
        export { UnsignedByteType };
        export { HalfFloatType };
        export { FloatType };
    }
    function BasisWorker(): void;
}
import { Loader } from 'three';
import { WorkerPool } from '../utils/WorkerPool.js';
import { CompressedTexture } from 'three';
import { RGBAFormat } from 'three';
import { RGBA_ASTC_4x4_Format } from 'three';
import { RGB_BPTC_UNSIGNED_Format } from 'three';
import { RGBA_BPTC_Format } from 'three';
import { RGBA_ETC2_EAC_Format } from 'three';
import { RGBA_PVRTC_4BPPV1_Format } from 'three';
import { RGBA_S3TC_DXT5_Format } from 'three';
import { RGB_ETC1_Format } from 'three';
import { RGB_ETC2_Format } from 'three';
import { RGB_PVRTC_4BPPV1_Format } from 'three';
import { RGBA_S3TC_DXT1_Format } from 'three';
import { UnsignedByteType } from 'three';
import { HalfFloatType } from 'three';
import { FloatType } from 'three';
