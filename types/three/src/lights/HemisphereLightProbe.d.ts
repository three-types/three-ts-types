import { ColorRepresentation } from '../utils.js';
import { LightProbe } from './LightProbe.js';

export class HemisphereLightProbe extends LightProbe {
    constructor(skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number);

    readonly isHemisphereLightProbe: true;
}
