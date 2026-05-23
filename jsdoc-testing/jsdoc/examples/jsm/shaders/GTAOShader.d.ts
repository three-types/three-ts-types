export function generateMagicSquareNoise(size?: number): DataTexture;
/**
 * @module GTAOShader
 * @three_import import { GTAOShader } from 'three/addons/shaders/GTAOShader.js';
 */
/**
 * GTAO shader. Use by {@link GTAOPass}.
 *
 * References:
 * - [Practical Realtime Strategies for Accurate Indirect Occlusion](https://iryoku.com/downloads/Practical-Realtime-Strategies-for-Accurate-Indirect-Occlusion.pdf).
 * - [Horizon-Based Indirect Lighting (HBIL)](https://github.com/Patapom/GodComplex/blob/master/Tests/TestHBIL/2018%20Mayaux%20-%20Horizon-Based%20Indirect%20Lighting%20(HBIL).pdf)
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const GTAOShader: ShaderMaterial;
/**
 * GTAO depth shader. Use by {@link GTAOPass}.
 *
 * @constant
 * @type {Object}
 */
export const GTAODepthShader: Object;
/**
 * GTAO blend shader. Use by {@link GTAOPass}.
 *
 * @constant
 * @type {Object}
 */
export const GTAOBlendShader: Object;
import { DataTexture } from 'three';
