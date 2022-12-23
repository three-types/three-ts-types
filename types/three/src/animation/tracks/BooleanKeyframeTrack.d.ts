import { KeyframeTrack } from './../KeyframeTrack';

export class BooleanKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: any[]);

    /**
     * @default 'bool'
     */
    ValueTypeName: string;
}
