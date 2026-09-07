/**
 * A collection of shaders used for SSR.
 *
 * References:
 * - [3D Game Shaders For Beginners, Screen Space Reflection (SSR)](https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html).
 *
 * @module SSRShader
 * @three_import import * as SSRShader from 'three/addons/shaders/SSRShader.js';
 */
/**
 * SSR shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SSRShader: ShaderMaterial;
/**
 * SSR Depth shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SSRDepthShader: ShaderMaterial;
/**
 * SSR Blur shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SSRBlurShader: ShaderMaterial;
