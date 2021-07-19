import { CapsulatedColor } from '../utils';
import { LightProbe } from './LightProbe';

export class HemisphereLightProbe extends LightProbe {
    constructor(skyColor?: CapsulatedColor, groundColor?: CapsulatedColor, intensity?: number);

    readonly isHemisphereLightProbe: true;
}
