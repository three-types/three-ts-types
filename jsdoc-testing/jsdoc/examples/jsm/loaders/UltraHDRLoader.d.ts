/**
 * A loader for the Ultra HDR Image Format.
 *
 * Existing HDR or EXR textures can be converted to Ultra HDR with this [tool](https://gainmap-creator.monogrid.com/).
 *
 * Current feature set:
 * - JPEG headers (required)
 * - XMP metadata (legacy format, supported)
 * - ISO 21496-1 metadata (current standard, supported)
 * - XMP validation (not implemented)
 * - EXIF profile (not implemented)
 * - ICC profile (not implemented)
 * - Binary storage for SDR & HDR images (required)
 * - Gainmap metadata (required)
 * - Non-JPEG image formats (not implemented)
 * - Primary image as an HDR image (not implemented)
 *
 * ```js
 * const loader = new UltraHDRLoader();
 * const texture = await loader.loadAsync( 'textures/equirectangular/ice_planet_close.jpg' );
 * texture.mapping = THREE.EquirectangularReflectionMapping;
 *
 * scene.background = texture;
 * scene.environment = texture;
 * ```
 *
 * @augments Loader
 * @three_import import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
 */
export class UltraHDRLoader extends Loader {
    /**
     * Constructs a new Ultra HDR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The texture type.
     *
     * @type {(HalfFloatType|FloatType)}
     * @default HalfFloatType
     */
    type: (number | FloatType);
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {UltraHDRLoader} A reference to this loader.
     */
    setDataType(value: (number | FloatType)): UltraHDRLoader;
    /**
     * Parses the given Ultra HDR texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @param {Function} onLoad - The `onLoad` callback.
     */
    parse(buffer: ArrayBuffer, onLoad: Function): void;
    /**
     * Parses ISO 21496-1 gainmap metadata from binary data.
     *
     * @private
     * @param {Uint8Array} data - The binary ISO metadata.
     * @param {Object} metadata - The metadata object to populate.
     */
    private _parseISOMetadata;
    /**
     * Starts loading from the given URL and passes the loaded Ultra HDR texture
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the files to be loaded. This can also be a data URI.
     * @param {function(DataTexture, Object)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {DataTexture} The Ultra HDR texture.
     */
    load(url: string, onLoad: (arg0: DataTexture, arg1: Object) => any, onProgress: onProgressCallback, onError: onErrorCallback): DataTexture;
    _parseXMPMetadata(xmpDataString: any, metadata: any): void;
    _srgbToLinear(value: any): number;
    _applyGainmapToSDR(metadata: any, sdrBuffer: any, gainmapBuffer: any, onSuccess: any, onError: any): void;
}
import { Loader } from 'three';
import { DataTexture } from 'three';
