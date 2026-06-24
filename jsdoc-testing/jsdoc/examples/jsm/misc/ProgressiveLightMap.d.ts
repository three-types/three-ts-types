/**
 * Progressive Light Map Accumulator, by [zalo](https://github.com/zalo/).
 *
 * To use, simply construct a `ProgressiveLightMap` object,
 * `plmap.addObjectsToLightMap(object)` an array of semi-static
 * objects and lights to the class once, and then call
 * `plmap.update(camera)` every frame to begin accumulating
 * lighting samples.
 *
 * This should begin accumulating lightmaps which apply to
 * your objects, so you can start jittering lighting to achieve
 * the texture-space effect you're looking for.
 *
 * This class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, import from `ProgressiveLightMapGPU.js`.
 *
 * @three_import import { ProgressiveLightMap } from 'three/addons/misc/ProgressiveLightMap.js';
 */
export class ProgressiveLightMap {
    /**
     * Constructs a new progressive light map.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {number} [res=1024] - The side-long dimension of the total lightmap.
     */
    constructor(renderer: WebGLRenderer, res?: number);
    /**
     * The renderer.
     *
     * @type {WebGLRenderer}
     */
    renderer: WebGLRenderer;
    /**
     * The side-long dimension of the total lightmap.
     *
     * @type {number}
     * @default 1024
     */
    res: number;
    lightMapContainers: any[];
    scene: Scene;
    buffer1Active: boolean;
    firstUpdate: boolean;
    labelMesh: Mesh | null;
    blurringPlane: Mesh | null;
    progressiveLightMap1: WebGLRenderTarget;
    progressiveLightMap2: WebGLRenderTarget;
    uvMat: MeshPhongMaterial;
    /**
     * Sets these objects' materials' lightmaps and modifies their uv1's.
     *
     * @param {Array<Object3D>} objects - An array of objects and lights to set up your lightmap.
     */
    addObjectsToLightMap(objects: Array<Object3D>): void;
    uv_boxes: any[] | undefined;
    /**
     * This function renders each mesh one at a time into their respective surface maps.
     *
     * @param {Camera} camera - The camera the scene is rendered with.
     * @param {number} [blendWindow=100] - When >1, samples will accumulate over time.
     * @param {boolean} [blurEdges=true] - Whether to fix UV Edges via blurring.
     */
    update(camera: Camera, blendWindow?: number, blurEdges?: boolean): void;
    /**
     * Draws the lightmap in the main scene. Call this after adding the objects to it.
     *
     * @param {boolean} visible - Whether the debug plane should be visible
     * @param {Vector3} [position] - Where the debug plane should be drawn
    */
    showDebugLightmap(visible: boolean, position?: Vector3): void;
    /**
     * Creates the Blurring Plane.
     *
     * @private
     * @param {number} res - The square resolution of this object's lightMap.
     * @param {WebGLRenderTarget} lightMap - The lightmap to initialize the plane with.
     */
    private _initializeBlurPlane;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
}
import { Scene } from 'three';
import { Mesh } from 'three';
import { WebGLRenderTarget } from 'three';
import { MeshPhongMaterial } from 'three';
