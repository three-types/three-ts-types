/**
 * @module HalftoneShader
 * @three_import import { HalftoneShader } from 'three/addons/shaders/HalftoneShader.js';
 */
/**
 * RGB Halftone shader.
 *
 * Used by {@link HalftonePass}.
 *
 * Shape (1 = Dot, 2 = Ellipse, 3 = Line, 4 = Square, 5 = Diamond)
 * Blending Mode (1 = Linear, 2 = Multiply, 3 = Add, 4 = Lighter, 5 = Darker)
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const HalftoneShader: ShaderMaterial;
