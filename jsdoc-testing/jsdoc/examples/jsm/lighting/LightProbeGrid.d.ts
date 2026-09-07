/**
 * A 3D grid of L2 Spherical Harmonic irradiance probes that provides
 * position-dependent diffuse global illumination.
 *
 * This is the {@link WebGPURenderer} version of `LightProbeGrid`. The grid is a
 * {@link Light}, so adding it to the scene applies its baked irradiance to every
 * lit node material automatically. When using {@link WebGLRenderer}, import the
 * grid from `LightProbeGridWebGL.js` instead.
 *
 * The baked data is stored in a single RGBA `RenderTarget3D` atlas that packs
 * the nine L2 SH coefficients into seven sub-volumes stacked along Z. Baking is
 * fully GPU-resident: cubemap rendering, SH projection, and texture packing all
 * happen on the GPU with zero CPU readback.
 *
 * @augments Light
 * @three_import import { LightProbeGrid } from 'three/addons/lighting/LightProbeGrid.js';
 */
export class LightProbeGrid extends Light {
    /**
     * Constructs a new irradiance probe grid.
     *
     * The volume is centered at the object's position.
     *
     * @param {number} [width=1] - Full width of the volume along X.
     * @param {number} [height=1] - Full height of the volume along Y.
     * @param {number} [depth=1] - Full depth of the volume along Z.
     * @param {number} [widthProbes] - Number of probes along X. Defaults to `Math.max( 2, Math.round( width ) + 1 )`.
     * @param {number} [heightProbes] - Number of probes along Y. Defaults to `Math.max( 2, Math.round( height ) + 1 )`.
     * @param {number} [depthProbes] - Number of probes along Z. Defaults to `Math.max( 2, Math.round( depth ) + 1 )`.
     */
    constructor(width?: number, height?: number, depth?: number, widthProbes?: number, heightProbes?: number, depthProbes?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLightProbeGrid: boolean;
    /**
     * The full width of the volume along X.
     *
     * @type {number}
     */
    width: number;
    /**
     * The full height of the volume along Y.
     *
     * @type {number}
     */
    height: number;
    /**
     * The full depth of the volume along Z.
     *
     * @type {number}
     */
    depth: number;
    /**
     * The number of probes along each axis.
     *
     * @type {Vector3}
     */
    resolution: Vector3;
    /**
     * The world-space bounding box for the grid. Updated automatically
     * by {@link LightProbeGrid#bake}.
     *
     * @type {Box3}
     */
    boundingBox: Box3;
    /**
     * Distance in world units over which the grid contribution fades out
     * past the volume boundary. `0` applies the contribution everywhere
     * (clamped), which matches a single-volume setup. Use a small positive
     * value to blend multiple overlapping grids.
     *
     * @type {number}
     * @default 0
     */
    falloff: number;
    /**
     * The single RGBA atlas 3D texture storing all seven packed SH
     * sub-volumes stacked along Z.
     *
     * @type {?Data3DTexture}
     * @default null
     */
    texture: Data3DTexture | null;
    /**
     * Internal render target for GPU-resident baking.
     *
     * @private
     * @type {?RenderTarget3D}
     * @default null
     */
    private _renderTarget;
    /**
     * Returns the world-space position of the probe at grid indices (ix, iy, iz).
     *
     * @param {number} ix - X index.
     * @param {number} iy - Y index.
     * @param {number} iz - Z index.
     * @param {Vector3} target - The target vector.
     * @return {Vector3} The world-space position.
     */
    getProbePosition(ix: number, iy: number, iz: number, target: Vector3): Vector3;
    /**
     * Updates the world-space bounding box from the current position and size.
     */
    updateBoundingBox(): void;
    /**
     * Bakes all probes by rendering cubemaps at each probe position and
     * projecting to L2 SH. Optionally iterates additional passes to capture
     * indirect bounces: each extra pass samples the previous pass's data as
     * indirect light, so a grid added to the scene before baking accumulates
     * one bounce per extra pass.
     *
     * @param {WebGPURenderer} renderer - The renderer.
     * @param {Scene} scene - The scene to render.
     * @param {Object} [options] - Bake options.
     * @param {number} [options.cubemapSize=8] - Resolution of each cubemap face.
     * @param {number} [options.near=0.1] - Near plane for the cube camera.
     * @param {number} [options.far=100] - Far plane for the cube camera.
     * @param {number} [options.bounces=0] - Additional bounce passes after the initial direct pass.
     * @param {number} [options.sampleCount=512] - Directions integrated when projecting each cubemap to SH.
     */
    bake(renderer: WebGPURenderer, scene: Scene, options?: {
        cubemapSize?: number | undefined;
        near?: number | undefined;
        far?: number | undefined;
        bounces?: number | undefined;
        sampleCount?: number | undefined;
    }): void;
    /**
     * Ensures the atlas 3D texture exists with the correct dimensions.
     *
     * @private
     */
    private _ensureTextures;
}
import { Light } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
import { Box3 } from 'three/webgpu';
