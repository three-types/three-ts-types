import { KeyframeTrack } from "../KeyframeTrack.js";

export class BooleanKeyframeTrack extends KeyframeTrack<boolean> {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<boolean>);

    /**
     * @default 'bool'
     */
    ValueTypeName: "bool";
}
