/**
 * A track for Quaternion keyframe values.
 *
 * @augments KeyframeTrack
 */
export class QuaternionKeyframeTrack extends KeyframeTrack {
    /**
     * Constructs a new Quaternion keyframe track.
     *
     * @param {string} name - The keyframe track's name.
     * @param {Array<number>} times - A list of keyframe times.
     * @param {Array<number>} values - A list of keyframe values.
     * @param {(InterpolateLinear|InterpolateDiscrete)} [interpolation] - The interpolation type. `InterpolateSmooth` is not supported for quaternions.
     */
    constructor(name: string, times: Array<number>, values: Array<number>, interpolation?: (InterpolateLinear | InterpolateDiscrete));
    InterpolantFactoryMethodSmooth: any;
}
import { KeyframeTrack } from '../KeyframeTrack.js';
