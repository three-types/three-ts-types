/**
 * Pass for creating a dot-screen effect.
 *
 * ```js
 * const pass = new DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );
 * composer.addPass( pass );
 * ```
 *
 * @augments Pass
 * @three_import import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js';
 */
export class DotScreenPass extends Pass {
    /**
     * Constructs a new dot screen pass.
     *
     * @param {Vector2} center - The center point.
     * @param {number} angle - The rotation of the effect in radians.
     * @param {number} scale - The scale of the effect. A higher value means smaller dots.
     */
    constructor(center: Vector2, angle: number, scale: number);
    /**
     * The pass uniforms. Use this object if you want to update the
     * `center`, `angle` or `scale` values at runtime.
     * ```js
     * pass.uniforms.center.value.copy( center );
     * pass.uniforms.angle.value = 0;
     * pass.uniforms.scale.value = 0.5;
     * ```
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * The pass material.
     *
     * @type {ShaderMaterial}
     */
    material: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the dot screen pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
