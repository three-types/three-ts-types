/**
 * @module SSAOShader
 * @three_import import { SSAOShader } from 'three/addons/shaders/SSAOShader.js';
 */
/**
 * SSAO shader.
 *
 * References:
 * - {@link http://john-chapman-graphics.blogspot.com/2013/01/ssao-tutorial.html}
 * - {@link https://learnopengl.com/Advanced-Lighting/SSAO}
 * - {@link https://github.com/McNopper/OpenGL/blob/master/Example28/shader/ssao.frag.glsl}
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SSAOShader: ShaderMaterial;
/**
 * SSAO depth shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const SSAODepthShader: ShaderMaterial;
/**
 * SSAO blur shader.
 *
 * @constant
 * @type {Object}
 */
export const SSAOBlurShader: Object;
