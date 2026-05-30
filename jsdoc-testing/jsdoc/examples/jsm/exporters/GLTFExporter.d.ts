/**
 * ~Options
 */
export type GLTFExporter = {
    /**
     * - Export position, rotation and scale instead of matrix per node.
     */
    trs?: boolean | undefined;
    /**
     * - Export only visible 3D objects.
     */
    onlyVisible?: boolean | undefined;
    /**
     * - Export in binary (.glb) format, returning an ArrayBuffer.
     */
    binary?: boolean | undefined;
    /**
     * - Restricts the image maximum size (both width and height) to the given value.
     */
    maxTextureSize?: number | undefined;
    /**
     * - List of animations to be included in the export.
     */
    animations?: AnimationClip[] | undefined;
    /**
     * - Export custom glTF extensions defined on an object's `userData.gltfExtensions` property.
     */
    includeCustomExtensions?: boolean | undefined;
};
/**
 * An exporter for `glTF` 2.0.
 *
 * glTF (GL Transmission Format) is an [open format specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)
 * for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf)
 * or binary (.glb) format. External files store textures (.jpg, .png) and additional binary
 * data (.bin). A glTF asset may deliver one or more scenes, including meshes, materials,
 * textures, skins, skeletons, morph targets, animations, lights, and/or cameras.
 *
 * GLTFExporter supports the [glTF 2.0 extensions](https://github.com/KhronosGroup/glTF/tree/master/extensions/):
 *
 * - KHR_lights_punctual
 * - KHR_materials_clearcoat
 * - KHR_materials_dispersion
 * - KHR_materials_emissive_strength
 * - KHR_materials_ior
 * - KHR_materials_iridescence
 * - KHR_materials_specular
 * - KHR_materials_sheen
 * - KHR_materials_transmission
 * - KHR_materials_unlit
 * - KHR_materials_volume
 * - KHR_mesh_quantization
 * - KHR_texture_transform
 * - EXT_materials_bump
 * - EXT_mesh_gpu_instancing
 * - EXT_texture_webp
 *
 * The following glTF 2.0 extension is supported by an external user plugin:
 *
 * - [KHR_materials_variants](https://github.com/takahirox/three-gltf-extensions)
 *
 * ```js
 * const exporter = new GLTFExporter();
 * const data = await exporter.parseAsync( scene, options );
 * ```
 *
 * @three_import import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
 */
export class GLTFExporter {
    /**
     * A reference to a texture utils module.
     *
     * @type {?(WebGLTextureUtils|WebGPUTextureUtils)}
     * @default null
     */
    textureUtils: (WebGLTextureUtils | WebGPUTextureUtils) | null;
    pluginCallbacks: any[];
    /**
     * Registers a plugin callback. This API is internally used to implement the various
     * glTF extensions but can also used by third-party code to add additional logic
     * to the exporter.
     *
     * @param {function(writer:GLTFWriter)} callback - The callback function to register.
     * @return {GLTFExporter} A reference to this exporter.
     */
    register(callback: any): GLTFExporter;
    /**
     * Unregisters a plugin callback.
     *
     * @param {Function} callback - The callback function to unregister.
     * @return {GLTFExporter} A reference to this exporter.
     */
    unregister(callback: Function): GLTFExporter;
    /**
     * Sets the texture utils for this exporter. Only relevant when compressed textures have to be exported.
     *
     * Depending on whether you use {@link WebGLRenderer} or {@link WebGPURenderer}, you must inject the
     * corresponding texture utils {@link WebGLTextureUtils} or {@link WebGPUTextureUtils}.
     *
     * @param {WebGLTextureUtils|WebGPUTextureUtils} utils - The texture utils.
     * @return {GLTFExporter} A reference to this exporter.
     */
    setTextureUtils(utils: WebGLTextureUtils | WebGPUTextureUtils): GLTFExporter;
    /**
     * Parses the given scenes and generates the glTF output.
     *
     * @param {Scene|Array<Scene>} input - A scene or an array of scenes.
     * @param {GLTFExporter~OnDone} onDone - A callback function that is executed when the export has finished.
     * @param {GLTFExporter~OnError} onError - A callback function that is executed when an error happens.
     * @param {GLTFExporter~Options} options - options
     */
    parse(input: Scene | Array<Scene>, onDone: any, onError: any, options: any): void;
    /**
     * Async version of {@link GLTFExporter#parse}.
     *
     * @param {Scene|Array<Scene>} input - A scene or an array of scenes.
     * @param {GLTFExporter~Options} options - options.
     * @return {Promise<ArrayBuffer|string>} A Promise that resolved with the exported glTF data.
     */
    parseAsync(input: Scene | Array<Scene>, options: any): Promise<ArrayBuffer | string>;
}
export namespace GLTFExporter {
    namespace Utils {
        function insertKeyframe(track: any, time: any): number | undefined;
        function mergeMorphTargetTracks(clip: any, root: any): any;
        function toTypedBufferAttribute(srcAttribute: any, TypedArray: any): BufferAttribute;
    }
}
import { Scene } from 'three';
import { BufferAttribute } from 'three';
