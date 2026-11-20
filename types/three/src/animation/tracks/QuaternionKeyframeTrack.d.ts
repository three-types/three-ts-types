import { InterpolationModes } from "../../constants.js";
import { KeyframeTrack } from "../KeyframeTrack.js";

/**
 * A track for Quaternion keyframe values.
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
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<number>, interpolation?: InterpolationModes);
}
