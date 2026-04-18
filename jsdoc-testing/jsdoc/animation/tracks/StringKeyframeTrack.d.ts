/**
 * A track for string keyframe values.
 *
 * @augments KeyframeTrack
 */
export class StringKeyframeTrack extends KeyframeTrack {
    /**
     * Constructs a new string keyframe track.
     *
     * This keyframe track type has no `interpolation` parameter because the
     * interpolation is always discrete.
     *
     * @param {string} name - The keyframe track's name.
     * @param {Array<number>} times - A list of keyframe times.
     * @param {Array<string>} values - A list of keyframe values.
     */
    constructor(name: string, times: Array<number>, values: Array<string>);
    /**
     * The default interpolation type of this keyframe track.
     *
     * @type {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)}
     * @default InterpolateDiscrete
     */
    DefaultInterpolation: (InterpolateLinear | number | InterpolateSmooth);
    InterpolantFactoryMethodLinear: any;
    InterpolantFactoryMethodSmooth: any;
}
import { KeyframeTrack } from '../KeyframeTrack.js';
