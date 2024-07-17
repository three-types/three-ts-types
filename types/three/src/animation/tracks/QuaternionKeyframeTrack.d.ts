import { InterpolationModes } from "../../constants.js";
import { KeyframeTrack } from "../KeyframeTrack.js";

export class QuaternionKeyframeTrack extends KeyframeTrack<number> {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<number>, interpolation?: InterpolationModes);

    /**
     * @default 'quaternion'
     */
    ValueTypeName: "quaternion";
}
