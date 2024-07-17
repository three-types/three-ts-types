import { KeyframeTrack } from "../KeyframeTrack.js";

export class StringKeyframeTrack extends KeyframeTrack<string> {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<string>);

    /**
     * @default 'string'
     */
    ValueTypeName: "string";
}
