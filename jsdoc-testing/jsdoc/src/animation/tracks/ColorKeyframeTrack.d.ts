/**
 * A track for color keyframe values.
 *
 * @augments KeyframeTrack
 */
export class ColorKeyframeTrack extends KeyframeTrack {
    /**
     * Constructs a new color keyframe track.
     *
     * @param {string} name - The keyframe track's name.
     * @param {Array<number>} times - A list of keyframe times.
     * @param {Array<number>} values - A list of keyframe values.
     * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} [interpolation] - The interpolation type.
     */
    constructor(name: string, times: Array<number>, values: Array<number>, interpolation?: (InterpolateLinear | InterpolateDiscrete | InterpolateSmooth | InterpolateBezier));
}
import { KeyframeTrack } from '../KeyframeTrack.js';
