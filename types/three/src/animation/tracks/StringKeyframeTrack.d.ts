import { KeyframeTrack } from './../KeyframeTrack';
import { InterpolationModes } from '../../constants';

export class StringKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: any[], interpolation?: InterpolationModes);

    /**
     * @default 'string'
     */
    ValueTypeName: string;
}
