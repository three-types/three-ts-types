import { ShaderMaterialParameters, ShaderMaterial } from './ShaderMaterial';

export class RawShaderMaterial extends ShaderMaterial {
    constructor(parameters?: ShaderMaterialParameters);
}

export interface RawShaderMaterialConstructor {
    new (parameters?: ShaderMaterialParameters): RawShaderMaterial;
    prototype: RawShaderMaterial;
}
