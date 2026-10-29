/**
 * A meshlet drawing pipeline with a hybrid rasterizer. Like {@link MeshletDrawingPipeline}, compute shaders select the
 * level of detail and cull objects and clusters, but the visible clusters are rasterized into a visibility
 * buffer: small triangles in software by a compute shader, large triangles by the hardware rasterizer. A
 * resolve pass shades the visibility buffer with the material of the meshes: its node graph is evaluated on
 * the reconstructed surface (position, normal, model matrices and the attributes of the geometry) with
 * analytic derivatives, so custom nodes, lights, shadows and the environment work as usual and the meshes
 * depth test against other objects.
 *
 * The visibility buffer stores the triangle in 16 bits, so only the levels of detail whose triangles fit
 * into this range are used. Geometries whose most detailed level doesn't fit are drawn by the hardware
 * pipeline of {@link MeshletDrawingPipeline}. The resolve only writes the color, so render calls with MRT, like the
 * velocity of TRAA, draw all clusters with the hardware pipeline. The position node of the material is evaluated
 * per corner of the triangles by the software rasterizer and by the resolve.
 *
 * ```js
 * renderer.drawingPipeline = new VisibilityBufferDrawingPipeline();
 * ```
 *
 * This class is experimental and its interface might change.
 *
 * @augments MeshletDrawingPipeline
 */
export class VisibilityBufferDrawingPipeline extends MeshletDrawingPipeline {
    /**
     * Constructs a new visibility buffer drawing pipeline.
     *
     * @param {Object} [parameters] - The configuration parameter.
     * @param {number} [parameters.lodThreshold=1] - The projected error in pixels below which a simpler level of detail is selected.
     * @param {number} [parameters.shadowLodThreshold=1] - The projected error in shadow map texels below which a simpler level of detail is selected for shadow casters.
     * @param {number} [parameters.maxRasterSize=8] - The maximum screen-space size in pixels of triangles rasterized in software.
     * @param {boolean} [parameters.debug=false] - Whether the clusters should be shown with a flat color each instead of the material.
     * @param {boolean} [parameters.occlusionCulling=true] - Whether the clusters hidden by other clusters should be culled.
     */
    constructor({ lodThreshold, shadowLodThreshold, maxRasterSize, debug, occlusionCulling }?: {
        lodThreshold?: number | undefined;
        shadowLodThreshold?: number | undefined;
        maxRasterSize?: number | undefined;
        debug?: boolean | undefined;
        occlusionCulling?: boolean | undefined;
    });
    _hardware: boolean;
    /**
     * The maximum screen-space size in pixels of triangles rasterized in software.
     * Larger triangles are drawn by the hardware rasterizer. The software rasterizer
     * loops over the pixels of a triangle in one thread, so it only pays off for small
     * triangles.
     *
     * @type {number}
     * @default 8
     */
    maxRasterSize: number;
    updateView(record: any, width: any, height: any): Object | null;
    _isSupportedMaterial(material: any): boolean;
    _canMergeLevels(): boolean;
    createView(width: any, height: any, occlusion: any): Object | null;
    /**
     * The batches of the software rasterizer index the triangles of one geometry, each geometry has its own batches.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @return {Object} The key.
     */
    _getBatchKey(clusters: Object): Object;
    createBatch(entry: any, capacity: any, view: any, culling: any): GPUDrivenBatch | VisibilityBufferBatch;
}
import { MeshletDrawingPipeline } from './MeshletDrawingPipeline.js';
import { GPUDrivenBatch } from './MeshletDrawingPipeline.js';
/**
 * A batch drawing the visible clusters into a visibility buffer: a compute shader rasterizes the small
 * triangles in software and queues the large ones for the hardware rasterizer. A resolve draws the bounding
 * box of each object and shades the fragments whose visible triangle belongs to the object.
 *
 * @private
 * @augments GPUDrivenBatch
 */
declare class VisibilityBufferBatch extends GPUDrivenBatch {
    triangleBase: import("three/tsl").UniformNode | undefined;
    maxRasterSize: import("three/tsl").UniformNode | undefined;
    instanceOffset: import("three/tsl").UniformNode | undefined;
    hwMesh: Mesh | undefined;
    resolveCount: import("three/tsl").UniformNode | undefined;
    resolveMesh: Mesh | undefined;
    fullscreenMesh: Mesh | undefined;
    update(...parameters: any[]): void;
}
import { Mesh } from 'three/webgpu';
export {};
