import { KeyframeTrack } from './../KeyframeTrack';
import { InterpolationModes } from '../../constants';

export class QuaternionKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: number[], interpolation?: InterpolationModes);

    /**
     * @default 'quaternion'
     */
    ValueTypeName: string;
}
