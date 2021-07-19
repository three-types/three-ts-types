import { CapsulatedColor } from '../utils';
import { LightProbe } from './LightProbe';

export class AmbientLightProbe extends LightProbe {
    constructor(color?: CapsulatedColor, intensity?: number);

    readonly isAmbientLightProbe: true;
}
