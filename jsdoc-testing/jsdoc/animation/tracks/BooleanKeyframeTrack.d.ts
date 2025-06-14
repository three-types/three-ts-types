/**
 * A track for boolean keyframe values.
 *
 * @augments KeyframeTrack
 */
export class BooleanKeyframeTrack extends KeyframeTrack {
    /**
     * Constructs a new boolean keyframe track.
     *
     * This keyframe track type has no `interpolation` parameter because the
     * interpolation is always discrete.
     *
     * @param {string} name - The keyframe track's name.
     * @param {Array<number>} times - A list of keyframe times.
     * @param {Array<number>} values - A list of keyframe values.
     */
    constructor(name: string, times: Array<number>, values: Array<number>);
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
