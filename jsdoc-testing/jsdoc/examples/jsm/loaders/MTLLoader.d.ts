/**
 * ~MaterialOptions
 */
export type MTLLoader = {
    /**
     * - Which side to apply the material.
     */
    side?: (number | BackSide | DoubleSide);
    /**
     * - What type of wrapping to apply for textures.
     */
    wrap?: (number | ClampToEdgeWrapping | MirroredRepeatWrapping);
    /**
     * - Whether RGB colors should be normalized to `0-1` from `0-255`.
     */
    normalizeRGB?: boolean | undefined;
    /**
     * - Ignore values of RGBs (Ka,Kd,Ks) that are all 0's.
     */
    ignoreZeroRGBs?: boolean | undefined;
};
/**
 * A loader for the MTL format.
 *
 * The Material Template Library format (MTL) or .MTL File Format is a companion file format
 * to OBJ that describes surface shading (material) properties of objects within one or more
 * OBJ files.
 *
 * ```js
 * const loader = new MTLLoader();
 * const materials = await loader.loadAsync( 'models/obj/male02/male02.mtl' );
 *
 * const objLoader = new OBJLoader();
 * objLoader.setMaterials( materials );
 * ```
 *
 * @augments Loader
 * @three_import import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
 */
export class MTLLoader extends Loader {
    constructor(manager: any);
    /**
     * Starts loading from the given URL and passes the loaded MTL asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(MaterialCreator)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: MaterialCreator) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Sets the material options.
     *
     * @param {MTLLoader~MaterialOptions} value - The material options.
     * @return {MTLLoader} A reference to this loader.
     */
    setMaterialOptions(value: any): MTLLoader;
    materialOptions: any;
    /**
     * Parses the given MTL data and returns the resulting material creator.
     *
     * @param {string} text - The raw MTL data as a string.
     * @param {string} path - The URL base path.
     * @return {MaterialCreator} The material creator.
     */
    parse(text: string, path: string): MaterialCreator;
}
import { Loader } from 'three';
/**
 * Material options of `MTLLoader`.
 *
 * @typedef {Object} MTLLoader~MaterialOptions
 * @property {(FrontSide|BackSide|DoubleSide)} [side=FrontSide] - Which side to apply the material.
 * @property {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)} [wrap=RepeatWrapping] - What type of wrapping to apply for textures.
 * @property {boolean} [normalizeRGB=false] - Whether RGB colors should be normalized to `0-1` from `0-255`.
 * @property {boolean} [ignoreZeroRGBs=false] - Ignore values of RGBs (Ka,Kd,Ks) that are all 0's.
 */
declare class MaterialCreator {
    constructor(baseUrl?: string, options?: {});
    baseUrl: string;
    options: {};
    materialsInfo: {};
    materials: {};
    materialsArray: any[];
    nameLookup: {};
    crossOrigin: string;
    side: any;
    wrap: any;
    setCrossOrigin(value: any): this;
    setManager(value: any): void;
    manager: any;
    setMaterials(materialsInfo: any): void;
    convert(materialsInfo: any): any;
    preload(): void;
    getIndex(materialName: any): any;
    getAsArray(): any[];
    create(materialName: any): any;
    createMaterial_(materialName: any): any;
    getTextureParams(value: any, matParams: any): {
        scale: Vector2;
        offset: Vector2;
    };
    loadTexture(url: any, mapping: any, onLoad: any, onProgress: any, onError: any): any;
}
import { Vector2 } from 'three';
export {};
