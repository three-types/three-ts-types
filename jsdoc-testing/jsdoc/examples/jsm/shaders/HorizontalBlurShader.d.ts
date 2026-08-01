/**
 * @module HorizontalBlurShader
 * @three_import import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
 */
/**
 * Two pass Gaussian blur filter (horizontal and vertical blur shaders).
 *
 * References:
 * - {@link http://www.cake23.de/traveling-wavefronts-lit-up.html}.
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const HorizontalBlurShader: ShaderMaterial;
