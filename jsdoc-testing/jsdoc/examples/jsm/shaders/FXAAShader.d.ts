/**
 * @module FXAAShader
 * @three_import import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
 */
/**
 * FXAA algorithm from NVIDIA, C# implementation by Jasper Flick, GLSL port by Dave Hoskins.
 *
 * References:
 * - {@link http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf}.
 * - {@link https://catlikecoding.com/unity/tutorials/advanced-rendering/fxaa/}.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const FXAAShader: ShaderMaterial;
