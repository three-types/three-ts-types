/**
 * @module DepthLimitedBlurShader
 * @three_import import { DepthLimitedBlurShader, BlurShaderUtils } from 'three/addons/shaders/DepthLimitedBlurShader.js';
 */
/**
 * TODO
 *
 * Used by {@link SAOPass}.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const DepthLimitedBlurShader: ShaderMaterial;
export namespace BlurShaderUtils {
    function createSampleWeights(kernelRadius: any, stdDev: any): number[];
    function createSampleOffsets(kernelRadius: any, uvIncrement: any): any[];
    function configure(material: any, kernelRadius: any, stdDev: any, uvIncrement: any): void;
}
