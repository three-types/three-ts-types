/**
 * A minimal renderer for 3D Gaussian splat geometry.
 *
 * Note that this class can only be used with {@link WebGPURenderer}. The
 * `forceWebGL` fallback of {@link WebGPURenderer} is supported, but
 * {@link WebGLRenderer} is not. Import maps or package exports must resolve
 * both `three/webgpu` and `three/tsl`.
 *
 * ```js
 * const splats = new GaussianSplatMesh( geometry );
 * scene.add( splats );
 * ```
 *
 * @augments Mesh
 * @three_import import { GaussianSplatMesh } from 'three/addons/objects/GaussianSplatMesh.js';
 */
export class GaussianSplatMesh extends Mesh {
    /**
     * Constructs a new Gaussian splat mesh.
     *
     * @param {BufferGeometry} splatGeometry - The splat geometry to render.
     * @param {Object} [options] - Options.
     * @param {boolean} [options.autoSort=true] - Whether to sort automatically in `onBeforeRender`.
     */
    constructor(splatGeometry: BufferGeometry, { autoSort }?: {
        autoSort?: boolean | undefined;
    });
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isGaussianSplatMesh: boolean;
    /**
     * The source splat geometry.
     *
     * @type {BufferGeometry}
     */
    splatGeometry: BufferGeometry;
    /**
     * Whether to sort automatically in `onBeforeRender`.
     *
     * @type {boolean}
     */
    autoSort: boolean;
    _buffers: {
        count: any;
        webGLBuffersEnabled: boolean;
        centerRead: import("three/webgpu").StorageBufferNode;
        covarianceARead: import("three/webgpu").StorageBufferNode;
        covarianceBRead: import("three/webgpu").StorageBufferNode;
        colorRead: import("three/webgpu").StorageBufferNode;
    };
    _sort: CountingSort;
    _sortMatrix: import("three/webgpu").UniformNode;
    _sortDepthRange: import("three/webgpu").UniformNode;
    _sortInitialized: boolean;
    _lastSortPosition: Vector3;
    _lastSortDirection: Vector3;
    _positionAttribute: any;
    onBeforeRender: (renderer: any, scene: any, camera: any) => void;
    /**
     * Updates the draw order if the camera has moved enough to need a new sort.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Camera} camera - The camera used for rendering.
     * @return {boolean} Whether a sort was dispatched this call.
     */
    updateSort(renderer: Renderer, camera: Camera): boolean;
    _needsSort(camera: any): boolean;
    _updateSortUniforms(camera: any): void;
    _sortCPU(): void;
}
import { Mesh } from 'three/webgpu';
import { CountingSort } from '../gpgpu/CountingSort.js';
import { Vector3 } from 'three/webgpu';
