/**
 * WebGL port of Subpixel Morphological Antialiasing (SMAA) v2.8
 * Preset: SMAA 1x Medium (with color edge detection)
 *
 * References:
 * - {@link https://github.com/iryoku/smaa/releases/tag/v2.8}
 *
 * @module SMAAShader
 * @three_import import { SMAAShader } from 'three/addons/shaders/SMAAShader.js';
 */
/**
 * SMAA Edges shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SMAAEdgesShader: ShaderMaterial;
/**
 * SMAA Weights shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SMAAWeightsShader: ShaderMaterial;
/**
 * SMAA Blend shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SMAABlendShader: ShaderMaterial;
