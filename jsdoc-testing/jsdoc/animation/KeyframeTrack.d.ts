/**
 * Represents s a timed sequence of keyframes, which are composed of lists of
 * times and related values, and which are used to animate a specific property
 * of an object.
 */
export class KeyframeTrack {
    /**
     * Converts the keyframe track to JSON.
     *
     * @static
     * @param {KeyframeTrack} track - The keyframe track to serialize.
     * @return {Object} The serialized keyframe track as JSON.
     */
    static toJSON(track: KeyframeTrack): Object;
    /**
     * Constructs a new keyframe track.
     *
     * @param {string} name - The keyframe track's name.
     * @param {Array<number>} times - A list of keyframe times.
     * @param {Array<number>} values - A list of keyframe values.
     * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
     */
    constructor(name: string, times: Array<number>, values: Array<number>, interpolation?: (number | number | number));
    /**
     * The track's name can refer to morph targets or bones or
     * possibly other values within an animated object. See {@link PropertyBinding#parseTrackName}
     * for the forms of strings that can be parsed for property binding.
     *
     * @type {string}
     */
    name: string;
    /**
     * The keyframe times.
     *
     * @type {Float32Array}
     */
    times: Float32Array;
    /**
     * The keyframe values.
     *
     * @type {Float32Array}
     */
    values: Float32Array;
    /**
     * Factory method for creating a new discrete interpolant.
     *
     * @static
     * @param {TypedArray} [result] - The result buffer.
     * @return {DiscreteInterpolant} The new interpolant.
     */
    InterpolantFactoryMethodDiscrete(result?: TypedArray): DiscreteInterpolant;
    /**
     * Factory method for creating a new linear interpolant.
     *
     * @static
     * @param {TypedArray} [result] - The result buffer.
     * @return {LinearInterpolant} The new interpolant.
     */
    InterpolantFactoryMethodLinear(result?: TypedArray): LinearInterpolant;
    /**
     * Factory method for creating a new smooth interpolant.
     *
     * @static
     * @param {TypedArray} [result] - The result buffer.
     * @return {CubicInterpolant} The new interpolant.
     */
    InterpolantFactoryMethodSmooth(result?: TypedArray): CubicInterpolant;
    /**
     * Defines the interpolation factor method for this keyframe track.
     *
     * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} interpolation - The interpolation type.
     * @return {KeyframeTrack} A reference to this keyframe track.
     */
    setInterpolation(interpolation: (number | number | number)): KeyframeTrack;
    createInterpolant: ((result?: TypedArray) => LinearInterpolant) | ((result?: TypedArray) => CubicInterpolant) | undefined;
    /**
     * Returns the current interpolation type.
     *
     * @return {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} The interpolation type.
     */
    getInterpolation(): (number | number | number);
    /**
     * Returns the value size.
     *
     * @return {number} The value size.
     */
    getValueSize(): number;
    /**
     * Moves all keyframes either forward or backward in time.
     *
     * @param {number} timeOffset - The offset to move the time values.
     * @return {KeyframeTrack} A reference to this keyframe track.
     */
    shift(timeOffset: number): KeyframeTrack;
    /**
     * Scale all keyframe times by a factor (useful for frame - seconds conversions).
     *
     * @param {number} timeScale - The time scale.
     * @return {KeyframeTrack} A reference to this keyframe track.
     */
    scale(timeScale: number): KeyframeTrack;
    /**
     * Removes keyframes before and after animation without changing any values within the defined time range.
     *
     * Note: The method does not shift around keys to the start of the track time, because for interpolated
     * keys this will change their values
     *
     * @param {number} startTime - The start time.
     * @param {number} endTime - The end time.
     * @return {KeyframeTrack} A reference to this keyframe track.
     */
    trim(startTime: number, endTime: number): KeyframeTrack;
    /**
     * Performs minimal validation on the keyframe track. Returns `true` if the values
     * are valid.
     *
     * @return {boolean} Whether the keyframes are valid or not.
     */
    validate(): boolean;
    /**
     * Optimizes this keyframe track by removing equivalent sequential keys (which are
     * common in morph target sequences).
     *
     * @return {AnimationClip} A reference to this animation clip.
     */
    optimize(): AnimationClip;
    /**
     * Returns a new keyframe track with copied values from this instance.
     *
     * @return {KeyframeTrack} A clone of this instance.
     */
    clone(): KeyframeTrack;
    /**
     * The value type name.
     *
     * @type {String}
     * @default ''
     */
    ValueTypeName: string;
    /**
     * The time buffer type of this keyframe track.
     *
     * @type {TypedArray|Array}
     * @default Float32Array.constructor
     */
    TimeBufferType: TypedArray | any[];
    /**
     * The value buffer type of this keyframe track.
     *
     * @type {TypedArray|Array}
     * @default Float32Array.constructor
     */
    ValueBufferType: TypedArray | any[];
    /**
     * The default interpolation type of this keyframe track.
     *
     * @type {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)}
     * @default InterpolateLinear
     */
    DefaultInterpolation: (number | number | number);
}
import { DiscreteInterpolant } from '../math/interpolants/DiscreteInterpolant.js';
import { LinearInterpolant } from '../math/interpolants/LinearInterpolant.js';
import { CubicInterpolant } from '../math/interpolants/CubicInterpolant.js';
