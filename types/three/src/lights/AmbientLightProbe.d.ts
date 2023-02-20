import { ColorRepresentation } from '../utils.js';
import { LightProbe } from './LightProbe.js';

export class AmbientLightProbe extends LightProbe {
    constructor(color?: ColorRepresentation, intensity?: number);

    readonly isAmbientLightProbe: true;
}
