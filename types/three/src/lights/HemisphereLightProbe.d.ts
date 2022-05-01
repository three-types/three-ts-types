import { ColorRepresentation } from '../utils';
import { LightProbe } from './LightProbe';

export class HemisphereLightProbe extends LightProbe {
    constructor(skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number);

    readonly isHemisphereLightProbe: true;
}

export interface HemisphereLightProbeConstructor {
    new (skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number): HemisphereLightProbe;
    prototype: HemisphereLightProbe;
}
