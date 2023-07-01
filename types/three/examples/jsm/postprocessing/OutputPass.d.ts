import { ShaderMaterial } from '../../../src/Three';
import { ToneMapping } from '../../../src/constants';

import { Pass, FullScreenQuad } from './Pass';

export class OutputPass extends Pass {
    constructor(toneMapping: ToneMapping, toneMappingExposure: number);
    uniforms: object;
    material: ShaderMaterial;
    fsQuad: FullScreenQuad;
    toneMapping: ToneMapping;
    toneMappingExposure: number;
}
