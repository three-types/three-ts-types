import { KeyframeTrack } from './../KeyframeTrack';

export class BooleanKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: any[], values: any[]);

    /**
     * @default 'bool'
     */
    ValueTypeName: string;
}

export interface BooleanKeyframeTrackConstructor {
    new (name: string, times: any[], values: any[]): BooleanKeyframeTrack;
    prototype: BooleanKeyframeTrack;
}
