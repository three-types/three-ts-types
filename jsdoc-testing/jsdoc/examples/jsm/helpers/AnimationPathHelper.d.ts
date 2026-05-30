/**
 * Visualizes the motion path of an animated object based on position keyframes
 * from an AnimationClip.
 *
 * ```js
 * const clip = model.animations[ 0 ];
 * const helper = new AnimationPathHelper( model, clip, object );
 * scene.add( helper );
 * ```
 *
 * @augments Object3D
 * @three_import import { AnimationPathHelper } from 'three/addons/helpers/AnimationPathHelper.js';
 */
export class AnimationPathHelper extends Object3D {
    /**
     * Constructs a new animation path helper.
     *
     * @param {Object3D} root - The root object containing the animation clips.
     * @param {AnimationClip} clip - The animation clip containing position keyframes.
     * @param {Object3D} object - The specific object to show the path for.
     * @param {Object} [options={}] - Configuration options.
     * @param {number|Color|string} [options.color=0x00ff00] - The path line color.
     * @param {number|Color|string} [options.markerColor=0xff0000] - The keyframe marker color.
     * @param {number} [options.divisions=100] - Number of samples for smooth path interpolation.
     * @param {boolean} [options.showMarkers=true] - Whether to show markers at keyframe positions.
     * @param {number} [options.markerSize=5] - Size of keyframe markers in pixels.
     */
    constructor(root: Object3D, clip: AnimationClip, object: Object3D, options?: {
        color?: number | Color | string;
        markerColor?: number | Color | string;
        divisions?: number | undefined;
        showMarkers?: boolean | undefined;
        markerSize?: number | undefined;
    });
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAnimationPathHelper: boolean;
    type: string;
    /**
     * The root object containing the animation clips.
     *
     * @type {Object3D}
     */
    root: Object3D;
    /**
     * The animation clip containing position keyframes.
     *
     * @type {AnimationClip}
     */
    clip: AnimationClip;
    /**
     * The object whose path is being visualized.
     *
     * @type {Object3D}
     */
    object: Object3D;
    /**
     * Number of samples for smooth path interpolation.
     *
     * @type {number}
     * @default 100
     */
    divisions: number;
    /**
     * The position track for the object.
     *
     * @type {KeyframeTrack|null}
     * @private
     */
    private _track;
    /**
     * The line representing the animation path.
     *
     * @type {Line}
     */
    line: Line;
    /**
     * Points marking keyframe positions.
     *
     * @type {Points|null}
     */
    points: Points | null;
    /**
     * Finds the position track for the given object.
     *
     * @private
     * @param {Object3D} object - The object to find the track for.
     * @returns {KeyframeTrack|null} The position track, or null if not found.
     */
    private _findTrackForObject;
    /**
     * Samples the track at regular intervals.
     *
     * @private
     * @returns {Float32Array} Array of sampled positions.
     */
    private _sampleTrack;
    /**
     * Updates the geometry with sampled path data.
     *
     * @private
     */
    private _updateGeometry;
    /**
     * Updates the helper's transform to match the object's parent.
     *
     * @param {boolean} force - Force matrix update.
     */
    updateMatrixWorld(force: boolean): void;
    /**
     * Sets the path line color.
     *
     * @param {number|Color|string} color - The new color.
     */
    setColor(color: number | Color | string): void;
    /**
     * Sets the keyframe marker color.
     *
     * @param {number|Color|string} color - The new color.
     */
    setMarkerColor(color: number | Color | string): void;
    /**
     * Frees the GPU-related resources allocated by this instance.
     */
    dispose(): void;
}
import { Object3D } from 'three';
import { Line } from 'three';
import { Points } from 'three';
