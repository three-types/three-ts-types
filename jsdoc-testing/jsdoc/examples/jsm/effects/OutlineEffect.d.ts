/**
 * ~Options
 */
export type OutlineEffect = {
    /**
     * - The outline thickness.
     */
    defaultThickness?: number | undefined;
    /**
     * - The outline color.
     */
    defaultColor?: number[] | undefined;
    /**
     * - The outline alpha value.
     */
    defaultAlpha?: number | undefined;
    /**
     * - Whether to keep alive cached internal materials or not.
     */
    defaultKeepAlive?: boolean | undefined;
};
/**
 * An outline effect for toon shaders.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link ToonOutlinePassNode}.
 *
 * ```js
 * const effect = new OutlineEffect( renderer );
 *
 * function render() {
 *
 * 	effect.render( scene, camera );
 *
 * }
 * ```
 *
 * @three_import import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
 */
export class OutlineEffect {
    /**
     * Constructs a new outline effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {OutlineEffect~Options} [parameters] - The configuration parameter.
     */
    constructor(renderer: WebGLRenderer, parameters?: {});
    enabled: boolean;
    /**
     * When using this effect, this method should be called instead of the
     * default {@link WebGLRenderer#render}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * This method can be used to render outlines in VR.
     *
     * ```js
     * const effect = new OutlineEffect( renderer );
     * let renderingOutline = false;
     *
     * scene.onAfterRender = function () {
     *
     * 	if ( renderingOutline ) return;
     *
     * 	renderingOutline = true;
     * 	effect.renderOutline( scene, camera );
     * 	renderingOutline = false;
     * };
     *
     * function render() {
     * 	renderer.render( scene, camera );
     * }
     * ```
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    renderOutline: (scene: Object3D, camera: Camera) => void;
    /**
     * Resizes the effect.
     *
     * @param {number} width - The width of the effect in logical pixels.
     * @param {number} height - The height of the effect in logical pixels.
     */
    setSize: (width: number, height: number) => void;
}
