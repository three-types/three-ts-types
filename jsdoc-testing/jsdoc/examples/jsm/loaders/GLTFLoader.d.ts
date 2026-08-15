/**
 * ~LoadObject
 */
export type GLTFLoader = {
    /**
     * - An array of animation clips.
     */
    animations: Array<AnimationClip>;
    /**
     * - Meta data about the loaded asset.
     */
    asset: Object;
    /**
     * - An array of cameras.
     */
    cameras: Array<Camera>;
    /**
     * - A reference to the internal parser.
     */
    parser: GLTFParser;
    /**
     * - The default scene.
     */
    scene: Group;
    /**
     * - glTF assets might define multiple scenes.
     */
    scenes: Array<Group>;
    /**
     * - Additional data.
     */
    userData: Object;
};
import { AnimationClip } from 'three';
declare class GLTFParser {
    constructor(json?: {}, options?: {});
    json: {};
    extensions: {};
    plugins: {};
    options: {};
    cache: any;
    associations: Map<any, any>;
    primitiveCache: {};
    nodeCache: {};
    meshCache: {
        refs: {};
        uses: {};
    };
    cameraCache: {
        refs: {};
        uses: {};
    };
    lightCache: {
        refs: {};
        uses: {};
    };
    sourceCache: {};
    textureCache: {};
    nodeNamesUsed: {};
    textureLoader: TextureLoader | ImageBitmapLoader;
    fileLoader: FileLoader;
    setExtensions(extensions: any): void;
    setPlugins(plugins: any): void;
    parse(onLoad: any, onError: any): void;
    /**
     * Marks the special nodes/meshes in json for efficient parse.
     *
     * @private
     */
    private _markDefs;
    /**
     * Counts references to shared node / Object3D resources. These resources
     * can be reused, or "instantiated", at multiple nodes in the scene
     * hierarchy. Mesh, Camera, and Light instances are instantiated and must
     * be marked. Non-scenegraph resources (like Materials, Geometries, and
     * Textures) can be reused directly and are not marked here.
     *
     * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
     *
     * @private
     * @param {Object} cache
     * @param {Object3D} index
     */
    private _addNodeRef;
    /**
     * Returns a reference to a shared resource, cloning it if necessary.
     *
     * @private
     * @param {Object} cache
     * @param {number} index
     * @param {Object} object
     * @return {Object}
     */
    private _getNodeRef;
    _invokeOne(func: any): any;
    _invokeAll(func: any): any[];
    /**
     * Requests the specified dependency asynchronously, with caching.
     *
     * @private
     * @param {string} type
     * @param {number} index
     * @return {Promise<Object3D|Material|Texture|AnimationClip|ArrayBuffer|Object>}
     */
    private getDependency;
    /**
     * Requests all dependencies of the specified type asynchronously, with caching.
     *
     * @private
     * @param {string} type
     * @return {Promise<Array<Object>>}
     */
    private getDependencies;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
     *
     * @private
     * @param {number} bufferIndex
     * @return {Promise<ArrayBuffer>}
     */
    private loadBuffer;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
     *
     * @private
     * @param {number} bufferViewIndex
     * @return {Promise<ArrayBuffer>}
     */
    private loadBufferView;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
     *
     * @private
     * @param {number} accessorIndex
     * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
     */
    private loadAccessor;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
     *
     * @private
     * @param {number} textureIndex
     * @return {Promise<?Texture>}
     */
    private loadTexture;
    loadTextureImage(textureIndex: any, sourceIndex: any, loader: any): any;
    loadImageSource(sourceIndex: any, loader: any): any;
    /**
     * Asynchronously assigns a texture to the given material parameters.
     *
     * @private
     * @param {Object} materialParams
     * @param {string} mapName
     * @param {Object} mapDef
     * @param {string} [colorSpace]
     * @return {Promise<Texture>}
     */
    private assignTexture;
    /**
     * Assigns final material to a Mesh, Line, or Points instance. The instance
     * already has a material (generated from the glTF material options alone)
     * but reuse of the same glTF material may require multiple threejs materials
     * to accommodate different primitive types, defines, etc. New materials will
     * be created if necessary, and reused from a cache.
     *
     * @private
     * @param {Object3D} mesh Mesh, Line, or Points instance.
     */
    private assignFinalMaterial;
    getMaterialType(): typeof MeshStandardMaterial;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
     *
     * @private
     * @param {number} materialIndex
     * @return {Promise<Material>}
     */
    private loadMaterial;
    /**
     * When Object3D instances are targeted by animation, they need unique names.
     *
     * @private
     * @param {string} originalName
     * @return {string}
     */
    private createUniqueName;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
     *
     * Creates BufferGeometries from primitives.
     *
     * @private
     * @param {Array<GLTF.Primitive>} primitives
     * @return {Promise<Array<BufferGeometry>>}
     */
    private loadGeometries;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
     *
     * @private
     * @param {number} meshIndex
     * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
     */
    private loadMesh;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
     *
     * @private
     * @param {number} cameraIndex
     * @return {Promise<Camera>|undefined}
     */
    private loadCamera;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
     *
     * @private
     * @param {number} skinIndex
     * @return {Promise<Skeleton>}
     */
    private loadSkin;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
     *
     * @private
     * @param {number} animationIndex
     * @return {Promise<AnimationClip>}
     */
    private loadAnimation;
    createNodeMesh(nodeIndex: any): Promise<Object> | null;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
     *
     * @private
     * @param {number} nodeIndex
     * @return {Promise<Object3D>}
     */
    private loadNode;
    _loadNodeShallow(nodeIndex: any): any;
    /**
     * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
     *
     * @private
     * @param {number} sceneIndex
     * @return {Promise<Group>}
     */
    private loadScene;
    _createAnimationTracks(node: any, inputAccessor: any, outputAccessor: any, sampler: any, target: any): QuaternionKeyframeTrack[];
    _getArrayFromAccessor(accessor: any): any;
    _createCubicSplineTrackInterpolant(track: any): void;
}
import { Group } from 'three';
/**
 * A loader for the glTF 2.0 format.
 *
 * [glTF](https://www.khronos.org/gltf/) (GL Transmission Format) is an [open format specification]{@link https://github.com/KhronosGroup/glTF/tree/main/specification/2.0)
 * for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf) or binary (.glb)
 * format. External files store textures (.jpg, .png) and additional binary data (.bin). A glTF asset may deliver
 * one or more scenes, including meshes, materials, textures, skins, skeletons, morph targets, animations, lights,
 * and/or cameras.
 *
 * `GLTFLoader` uses {@link ImageBitmapLoader} whenever possible. Be advised that image bitmaps are not
 * automatically GC-collected when they are no longer referenced, and they require special handling during
 * the disposal process.
 *
 * `GLTFLoader` supports the following glTF 2.0 extensions:
 * - KHR_draco_mesh_compression
 * - KHR_lights_punctual
 * - KHR_materials_anisotropy
 * - KHR_materials_clearcoat
 * - KHR_materials_dispersion
 * - KHR_materials_emissive_strength
 * - KHR_materials_ior
 * - KHR_materials_specular
 * - KHR_materials_transmission
 * - KHR_materials_iridescence
 * - KHR_materials_unlit
 * - KHR_materials_volume
 * - KHR_mesh_quantization
 * - KHR_meshopt_compression
 * - KHR_texture_basisu
 * - KHR_texture_transform
 * - EXT_materials_bump
 * - EXT_meshopt_compression
 * - EXT_mesh_gpu_instancing
 * - EXT_texture_avif
 * - EXT_texture_webp
 *
 * The following glTF 2.0 extension is supported by an external user plugin:
 * - [KHR_materials_variants](https://github.com/takahirox/three-gltf-extensions)
 * - [MSFT_texture_dds](https://github.com/takahirox/three-gltf-extensions)
 * - [KHR_animation_pointer](https://github.com/needle-tools/three-animation-pointer)
 * - [NEEDLE_progressive](https://github.com/needle-tools/gltf-progressive)
 *
 * ```js
 * const loader = new GLTFLoader();
 *
 * // Optional: Provide a DRACOLoader instance to decode compressed mesh data
 * const dracoLoader = new DRACOLoader();
 * dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
 * loader.setDRACOLoader( dracoLoader );
 *
 * const gltf = await loader.loadAsync( 'models/gltf/duck/duck.gltf' );
 * scene.add( gltf.scene );
 * ```
 *
 * @augments Loader
 * @three_import import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 */
export class GLTFLoader extends Loader {
    /**
     * Constructs a new glTF loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    dracoLoader: any;
    ktx2Loader: any;
    meshoptDecoder: Object | null;
    pluginCallbacks: any[];
    /**
     * Starts loading from the given URL and passes the loaded glTF asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Sets the given Draco loader to this loader. Required for decoding assets
     * compressed with the `KHR_draco_mesh_compression` extension.
     *
     * @param {DRACOLoader} dracoLoader - The Draco loader to set.
     * @return {GLTFLoader} A reference to this loader.
     */
    setDRACOLoader(dracoLoader: DRACOLoader): GLTFLoader;
    /**
     * Sets the given KTX2 loader to this loader. Required for loading KTX2
     * compressed textures.
     *
     * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
     * @return {GLTFLoader} A reference to this loader.
     */
    setKTX2Loader(ktx2Loader: KTX2Loader): GLTFLoader;
    /**
     * Sets the given meshopt decoder. Required for decoding assets
     * compressed with the `EXT_meshopt_compression` extension.
     *
     * @param {Object} meshoptDecoder - The meshopt decoder to set.
     * @return {GLTFLoader} A reference to this loader.
     */
    setMeshoptDecoder(meshoptDecoder: Object): GLTFLoader;
    /**
     * Registers a plugin callback. This API is internally used to implement the various
     * glTF extensions but can also used by third-party code to add additional logic
     * to the loader.
     *
     * @param {function(parser:GLTFParser)} callback - The callback function to register.
     * @return {GLTFLoader} A reference to this loader.
     */
    register(callback: any): GLTFLoader;
    /**
     * Unregisters a plugin callback.
     *
     * @param {Function} callback - The callback function to unregister.
     * @return {GLTFLoader} A reference to this loader.
     */
    unregister(callback: Function): GLTFLoader;
    /**
     * Parses the given glTF data and returns the resulting group.
     *
     * @param {string|ArrayBuffer} data - The raw glTF data.
     * @param {string} path - The URL base path.
     * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    parse(data: string | ArrayBuffer, path: string, onLoad: any, onError: onErrorCallback): void;
    /**
     * Async version of {@link GLTFLoader#parse}.
     *
     * @async
     * @param {string|ArrayBuffer} data - The raw glTF data.
     * @param {string} path - The URL base path.
     * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
     */
    parseAsync(data: string | ArrayBuffer, path: string): Promise<GLTFLoader>;
}
import { TextureLoader } from 'three';
import { ImageBitmapLoader } from 'three';
import { FileLoader } from 'three';
import { MeshStandardMaterial } from 'three';
import { QuaternionKeyframeTrack } from 'three';
import { Loader } from 'three';
export {};
