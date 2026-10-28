/**
 * A class that creates an anaglyph effect using physically-correct
 * off-axis stereo projection.
 *
 * This implementation uses CameraUtils.frameCorners() to align stereo
 * camera frustums to a virtual screen plane, providing accurate depth
 * perception with zero parallax at the plane distance.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link AnaglyphPassNode}.
 *
 * @three_import import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
 */
export class AnaglyphEffect {
    /**
     * Constructs a new anaglyph effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {number} width - The width of the effect in physical pixels.
     * @param {number} height - The height of the effect in physical pixels.
     */
    constructor(renderer: WebGLRenderer, width?: number, height?: number);
    colorMatrixLeft: Matrix3;
    colorMatrixRight: Matrix3;
    /**
     * The interpupillary distance (eye separation) in world units.
     * Typical human IPD is 0.064 meters (64mm).
     *
     * @type {number}
     * @default 0.064
     */
    eyeSep: number;
    /**
     * The distance in world units from the viewer to the virtual
     * screen plane where zero parallax (screen depth) occurs.
     * Objects at this distance appear at the screen surface.
     * Objects closer appear in front of the screen (negative parallax).
     * Objects further appear behind the screen (positive parallax).
     *
     * The screen dimensions are derived from the camera's FOV and aspect ratio
     * at this distance, ensuring the stereo view matches the camera's field of view.
     *
     * @type {number}
     * @default 0.5
     */
    planeDistance: number;
    /**
     * Resizes the effect.
     *
     * @param {number} width - The width of the effect in logical pixels.
     * @param {number} height - The height of the effect in logical pixels.
     */
    setSize: (width: number, height: number) => void;
    /**
     * When using this effect, this method should be called instead of the
     * default {@link WebGLRenderer#render}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * Frees internal resources. This method should be called
     * when the effect is no longer required.
     */
    dispose: () => void;
}
import { Matrix3 } from 'three';
