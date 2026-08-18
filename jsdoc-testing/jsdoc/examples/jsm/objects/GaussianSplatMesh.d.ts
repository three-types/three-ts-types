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
     * @param {BufferGeometry} splatGeometry - The splat geometry to render. Higher-order spherical harmonics attributes must use packed `Uint32Array` words from {@link createGaussianSplatGeometry} (`SH_BAND_WORDS[ degree ]` words per splat, four clamped-byte coefficients per word).
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
        sphericalHarmonicsDegree: any;
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
    _localCameraPosition: import("three/webgpu").UniformNode;
    _sphericalHarmonicsComputeNode: any;
    _sphericalHarmonicsInitialized: boolean;
    _lastSphericalHarmonicsCameraMatrix: Matrix4;
    _lastSphericalHarmonicsWorldMatrix: Matrix4;
    _sphericalHarmonicsVertexNode: void | null;
    _precomputedSphericalHarmonicsVertexNode: void;
    _positionAttribute: any;
    onBeforeRender: (renderer: any, scene: any, camera: any) => void;
    /**
     * Updates the view-dependent spherical harmonics colors if the camera or
     * mesh transform has changed.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Camera} camera - The camera used for rendering.
     * @return {boolean} Whether a compute pass was dispatched this call.
     */
    updateSphericalHarmonics(renderer: Renderer, camera: Camera): boolean;
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
import { Matrix4 } from 'three/webgpu';
