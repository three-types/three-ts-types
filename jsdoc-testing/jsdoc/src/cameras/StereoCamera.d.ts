/**
 * A special type of camera that uses two perspective cameras with
 * stereoscopic projection. Can be used for rendering stereo effects
 * like [3D Anaglyph](https://en.wikipedia.org/wiki/Anaglyph_3D) or
 * [Parallax Barrier](https://en.wikipedia.org/wiki/parallax_barrier).
 */
export class StereoCamera {
    /**
     * The type property is used for detecting the object type
     * in context of serialization/deserialization.
     *
     * @type {string}
     * @readonly
     */
    readonly type: string;
    /**
     * The aspect.
     *
     * @type {number}
     * @default 1
     */
    aspect: number;
    /**
     * The eye separation which represents the distance
     * between the left and right camera.
     *
     * @type {number}
     * @default 0.064
     */
    eyeSep: number;
    /**
     * The camera representing the left eye. It has layer `1` enabled in addition to the
     * default layer `0`, so objects only on layer `1` are rendered by the left camera only.
     *
     * @type {PerspectiveCamera}
     */
    cameraL: PerspectiveCamera;
    /**
     * The camera representing the right eye. It has layer `2` enabled in addition to the
     * default layer `0`, so objects only on layer `2` are rendered by the right camera only.
     *
     * @type {PerspectiveCamera}
     */
    cameraR: PerspectiveCamera;
    _cache: {
        focus: null;
        fov: null;
        aspect: null;
        near: null;
        far: null;
        zoom: null;
        eyeSep: null;
    };
    /**
     * Updates the stereo camera based on the given perspective camera.
     *
     * @param {PerspectiveCamera} camera - The perspective camera.
     */
    update(camera: PerspectiveCamera): void;
}
import { PerspectiveCamera } from './PerspectiveCamera.js';
