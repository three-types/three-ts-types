/**
 * Utility class for creating instances of {@link LightProbe}.
 *
 * @hideconstructor
 * @three_import import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';
 */
export class LightProbeGenerator {
    /**
     * Creates a light probe from the given (radiance) environment map.
     * The method expects that the environment map is represented as a cube texture.
     *
     * @param {CubeTexture} cubeTexture - The environment map.
     * @return {LightProbe} The created light probe.
     */
    static fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
    /**
     * Creates a light probe from the given (radiance) environment map.
     * The method expects that the environment map is represented as a cube render target.
     *
     * The cube render target must be in RGBA so `cubeRenderTarget.texture.format` must be
     * set to {@link RGBAFormat}.
     *
     * @async
     * @param {WebGPURenderer|WebGLRenderer} renderer - The renderer.
     * @param {CubeRenderTarget|WebGLCubeRenderTarget} cubeRenderTarget - The environment map.
     * @return {Promise<LightProbe>} A Promise that resolves with the created light probe.
     */
    static fromCubeRenderTarget(renderer: WebGPURenderer | WebGLRenderer, cubeRenderTarget: CubeRenderTarget | WebGLCubeRenderTarget): Promise<LightProbe>;
}
import { LightProbe } from 'three';
