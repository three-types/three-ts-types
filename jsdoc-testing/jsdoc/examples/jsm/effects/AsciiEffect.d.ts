/**
 * ~Options
 */
export type AsciiEffect = {
    /**
     * - A higher value leads to more details.
     */
    resolution?: number | undefined;
    /**
     * - The scale of the effect.
     */
    scale?: number | undefined;
    /**
     * - Whether colors should be enabled or not. Better quality but slows down rendering.
     */
    color?: boolean | undefined;
    /**
     * - Whether transparency should be enabled or not.
     */
    alpha?: boolean | undefined;
    /**
     * - Whether blocked characters should be enabled or not.
     */
    block?: boolean | undefined;
    /**
     * - Whether colors should be inverted or not.
     */
    invert?: boolean | undefined;
    /**
     * - The string resolution.
     */
    strResolution?: "high" | "low" | "medium" | undefined;
};
/**
 * A class that creates an ASCII effect.
 *
 * The ASCII generation is based on [jsascii](https://github.com/hassadee/jsascii/blob/master/jsascii.js).
 *
 * @three_import import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
 */
export class AsciiEffect {
    /**
     * Constructs a new ASCII effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {string} [charSet=' .:-=+*#%@'] - The char set.
     * @param {AsciiEffect~Options} [options] - The configuration parameter.
     */
    constructor(renderer: WebGLRenderer, charSet?: string, options?: {});
    /**
     * Resizes the effect.
     *
     * @param {number} w - The width of the effect in logical pixels.
     * @param {number} h - The height of the effect in logical pixels.
     */
    setSize: (w: number, h: number) => void;
    /**
     * When using this effect, this method should be called instead of the
     * default {@link WebGLRenderer#render}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * The DOM element of the effect. This element must be used instead of the
     * default {@link WebGLRenderer#domElement}.
     *
     * @type {HTMLDivElement}
     */
    domElement: HTMLDivElement;
}
