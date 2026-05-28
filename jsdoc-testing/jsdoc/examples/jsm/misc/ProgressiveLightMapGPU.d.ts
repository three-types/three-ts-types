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
 * This class can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, import from `ProgressiveLightMap.js`.
 *
 * @three_import import { ProgressiveLightMap } from 'three/addons/misc/ProgressiveLightMapGPU.js';
 */
export class ProgressiveLightMap {
    /**
     * @param {WebGPURenderer} renderer - The renderer.
     * @param {number} [resolution=1024] - The side-long dimension of the total lightmap.
     */
    constructor(renderer: WebGPURenderer, resolution?: number);
    /**
     * The renderer.
     *
     * @type {WebGPURenderer}
     */
    renderer: WebGPURenderer;
    /**
     * The side-long dimension of the total lightmap.
     *
     * @type {number}
     * @default 1024
     */
    resolution: number;
    _lightMapContainers: any[];
    _scene: Scene;
    _buffer1Active: boolean;
    _labelMesh: Mesh | null;
    _blurringPlane: Mesh | null;
    _progressiveLightMap1: RenderTarget;
    _progressiveLightMap2: RenderTarget;
    _averagingWindow: import("three/webgpu").UniformNode;
    _previousShadowMap: import("three/webgpu").TextureNode;
    _uvMat: MeshPhongNodeMaterial;
    /**
     * Sets these objects' materials' lightmaps and modifies their uv1's.
     *
     * @param {Array<Object3D>} objects - An array of objects and lights to set up your lightmap.
     */
    addObjectsToLightMap(objects: Array<Object3D>): void;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
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
     */
    private _initializeBlurPlane;
}
import { Scene } from 'three/webgpu';
import { Mesh } from 'three/webgpu';
import { RenderTarget } from 'three/webgpu';
import { MeshPhongNodeMaterial } from 'three/webgpu';
