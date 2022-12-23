import { KeyframeTrack } from './../KeyframeTrack';
import { InterpolationModes } from '../../constants';

export class VectorKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: number[], interpolation?: InterpolationModes);

    /**
     * @default 'vector'
     */
    ValueTypeName: string;
}
