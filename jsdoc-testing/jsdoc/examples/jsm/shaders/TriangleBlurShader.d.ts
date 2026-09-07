/**
 * @module TriangleBlurShader
 * @three_import import { TriangleBlurShader } from 'three/addons/shaders/TriangleBlurShader.js';
 */
/**
 * Triangle blur shader based on [glfx.js triangle blur shader](https://github.com/evanw/glfx.js).
 *
 * A basic blur filter, which convolves the image with a
 * pyramid filter. The pyramid filter is separable and is applied as two
 * perpendicular triangle filters.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const TriangleBlurShader: ShaderMaterial;
