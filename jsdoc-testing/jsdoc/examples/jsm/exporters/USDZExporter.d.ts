/**
 * ~Options
 */
export type USDZExporter = {
    /**
     * - The maximum texture size that is going to be exported.
     */
    maxTextureSize?: number | undefined;
    /**
     * - Whether to include anchoring properties or not.
     */
    includeAnchoringProperties?: boolean | undefined;
    /**
     * - Export only visible 3D objects.
     */
    onlyVisible?: boolean | undefined;
    /**
     * - If `includeAnchoringProperties` is set to `true`, the anchoring type and alignment
     * can be configured via `ar.anchoring.type` and `ar.planeAnchoring.alignment`.
     */
    ar?: Object | undefined;
    /**
     * - Whether to make the exported USDZ compatible to QuickLook
     * which means the asset is modified to accommodate the bugs FB10036297 and FB11442287 (Apple Feedback).
     */
    quickLookCompatible?: boolean | undefined;
    /**
     * - Animation clips to bake into `xformOp` time samples on the
     * targeted objects. Only `position`, `quaternion`, and `scale` tracks are exported.
     */
    animations?: AnimationClip[] | undefined;
    /**
     * - Time codes per second used when writing animation samples.
     */
    animationFrameRate?: number | undefined;
};
/**
 * An exporter for USDZ.
 *
 * ```js
 * const exporter = new USDZExporter();
 * const arraybuffer = await exporter.parseAsync( scene );
 * ```
 *
 * @three_import import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
 */
export class USDZExporter {
    /**
     * A reference to a texture utils module.
     *
     * @type {?(WebGLTextureUtils|WebGPUTextureUtils)}
     * @default null
     */
    textureUtils: (WebGLTextureUtils | WebGPUTextureUtils) | null;
    /**
     * Sets the texture utils for this exporter. Only relevant when compressed textures have to be exported.
     *
     * Depending on whether you use {@link WebGLRenderer} or {@link WebGPURenderer}, you must inject the
     * corresponding texture utils {@link WebGLTextureUtils} or {@link WebGPUTextureUtils}.
     *
     * @param {WebGLTextureUtils|WebGPUTextureUtils} utils - The texture utils.
     */
    setTextureUtils(utils: WebGLTextureUtils | WebGPUTextureUtils): void;
    /**
     * Parse the given 3D object and generates the USDZ output.
     *
     * @param {Object3D} scene - The 3D object to export.
     * @param {USDZExporter~OnDone} onDone - A callback function that is executed when the export has finished.
     * @param {USDZExporter~OnError} onError - A callback function that is executed when an error happens.
     * @param {USDZExporter~Options} options - The export options.
     */
    parse(scene: Object3D, onDone: any, onError: any, options: any): void;
    /**
     * Async version of {@link USDZExporter#parse}.
     *
     * @async
     * @param {Object3D} scene - The 3D object to export.
     * @param {USDZExporter~Options} options - The export options.
     * @return {Promise<ArrayBuffer>} A Promise that resolved with the exported USDZ data.
     */
    parseAsync(scene: Object3D, options?: {}): Promise<ArrayBuffer>;
}
