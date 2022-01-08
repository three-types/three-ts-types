import {
    AvoidNullUniforms,
    ExtractUniforms,
    ShaderMaterial,
    ShaderMaterialParameters,
    TUniforms,
} from '../../../src/Three';

import { FullScreenQuad, Pass } from './Pass';

export type ShaderLike<Uniforms extends TUniforms> = {
    fragmentShader: ShaderMaterial['fragmentShader'];
    vertexShader?: ShaderMaterial['vertexShader'];
    defines?: ShaderMaterial['defines'];
} & (Exclude<keyof Uniforms, string> extends never ? { uniforms: Uniforms } : { uniforms?: Uniforms });

export class ShaderPass<T extends {} = TUniforms, Uniforms extends TUniforms = ExtractUniforms<T>> extends Pass {
    constructor(shader: ShaderLike<Uniforms>, textureID?: string);
    textureID: string;
    uniforms: AvoidNullUniforms<Uniforms>;
    material: ShaderMaterial<Uniforms>;
    fsQuad: FullScreenQuad;
}
