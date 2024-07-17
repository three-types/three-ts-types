import { InterpolationModes } from "../../constants.js";
import { KeyframeTrack } from "../KeyframeTrack.js";

export class NumberKeyframeTrack extends KeyframeTrack<number> {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<number>, interpolation?: InterpolationModes);

    /**
     * @default 'number'
     */
    ValueTypeName: "number";
}
