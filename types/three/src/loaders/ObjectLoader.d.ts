/**
 * A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
 * The files are internally loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.ObjectLoader();
 * const obj = await loader.loadAsync( 'models/json/example.json' );
 * scene.add( obj );
 *
 * // Alternatively, to parse a previously loaded JSON structure
 * const object = await loader.parseAsync( a_json_object );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 */
export class ObjectLoader extends Loader<Object3D> {
    /**
     * Registers the given geometry at the internal
     * geometry library.
     *
     * @static
     * @param {string} type - The geometry type.
     * @param {BufferGeometry.constructor} geometryClass - The geometry class.
     */
    static registerGeometry(type: string, geometryClass: {
        fromJSON(data: unknown, shapes: {
            [x: string]: Shape;
        }): BufferGeometry;
    }): void;
    /**
     * Constructs a new object loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and pass the loaded 3D object to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object3D)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(
        url: string,
        onLoad?: (data: Object3D) => void,
        onProgress?: onProgressCallback,
        onError?: onErrorCallback,
    ): void;
    /**
     * Async version of {@link ObjectLoader#load}.
     *
     * @async
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @return {Promise<Object3D>} A Promise that resolves with the loaded 3D object.
     */
    loadAsync(url: string, onProgress?: onProgressCallback): Promise<Object3D>;
    /**
     * Parses the given JSON. This is used internally by {@link ObjectLoader#load}
     * but can also be used directly to parse a previously loaded JSON structure.
     *
     * @param {Object} json - The serialized 3D object.
     * @param {onLoad} onLoad - Executed when all resources (e.g. textures) have been fully loaded.
     * @return {Object3D} The parsed 3D object.
     */
    parse(json: unknown, onLoad?: (object: Object3D) => void): Object3D;
    /**
     * Async version of {@link ObjectLoader#parse}.
     *
     * @param {Object} json - The serialized 3D object.
     * @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
     */
    parseAsync(json: unknown): Promise<Object3D>;
    parseShapes(json: unknown): {
        [key: string]: Shape;
    };
    parseSkeletons(json: unknown, object: Object3D): {
        [key: string]: Skeleton;
    };
    parseGeometries(json: unknown, shapes: {
        [key: string]: Shape;
    }): {
        [key: string]: InstancedBufferGeometry | BufferGeometry;
    };
    parseMaterials(json: unknown, textures: {
        [key: string]: Texture;
    }): {
        [key: string]: Material;
    };
    parseAnimations(json: unknown): {
        [key: string]: AnimationClip;
    };
    parseImages(json: unknown, onLoad?: () => void): {
        [key: string]: TextureSource<unknown>;
    };
    parseImagesAsync(json: unknown): Promise<{
        [key: string]: TextureSource<unknown>;
    }>;
    parseTextures(json: unknown, images: {
        [key: string]: TextureSource<unknown>;
    }): {
        [key: string]: Texture;
    };
    parseObject(data: unknown, geometries: {
        [key: string]: InstancedBufferGeometry | BufferGeometry;
    }, materials: {
        [key: string]: Material;
    }, textures: {
        [key: string]: Texture;
    }, animations: {
        [key: string]: AnimationClip;
    }): Object3D;
    bindSkeletons(object: Object3D, skeletons: {
        [key: string]: Skeleton;
    }): void;
    bindLightTargets(object: Object3D): void;
}
import { AnimationClip } from "../animation/AnimationClip.js";
import { BufferGeometry } from "../core/BufferGeometry.js";
import { InstancedBufferGeometry } from "../core/InstancedBufferGeometry.js";
import { Object3D } from "../core/Object3D.js";
import { Shape } from "../extras/core/Shape.js";
import { Material } from "../materials/Material.js";
import { Skeleton } from "../objects/Skeleton.js";
import { Texture } from "../textures/Texture.js";
import { TextureSource } from "../textures/TextureSource.js";
import { Loader, onErrorCallback, onProgressCallback } from "./Loader.js";
import { LoadingManager } from "./LoadingManager.js";
