/**
 * @module RGBShiftShader
 * @three_import import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
 */
/**
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from https://web.archive.org/web/20090820185047/http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / https://web.archive.org/web/20090810054752/http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const RGBShiftShader: ShaderMaterial;
