/**
 * @module ACESFilmicToneMappingShader
 * @three_import import { ACESFilmicToneMappingShader } from 'three/addons/shaders/ACESFilmicToneMappingShader.js';
 */
/**
 * ACES Filmic Tone Mapping Shader by Stephen Hill.
 * Reference: [ltc_blit.fs](https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs)
 *
 * This implementation of ACES is modified to accommodate a brighter viewing environment.
 * The scale factor of 1/0.6 is subjective. See discussion in #19621.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const ACESFilmicToneMappingShader: ShaderMaterial;
