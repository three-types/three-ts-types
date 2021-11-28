import { AvoidNullUniforms, ExtractUniforms, ShaderMaterial, TUniforms } from '../../../src/Three';

import { FullScreenQuad, Pass } from './Pass';

export type TShader<Uniforms extends TUniforms> =
    | ShaderMaterial<Uniforms>
    | (Required<Pick<ShaderMaterial<Uniforms>, 'fragmentShader'>> &
          Partial<Pick<ShaderMaterial<Uniforms>, 'vertexShader' | 'uniforms' | 'defines'>>);

export class ShaderPass<T extends {} = TUniforms, Uniforms extends TUniforms = ExtractUniforms<T>> extends Pass {
    constructor(shader: TShader<Uniforms>, textureID?: string);
    textureID: string;
    uniforms: AvoidNullUniforms<Uniforms>;
    material: ShaderMaterial<Uniforms>;
    fsQuad: FullScreenQuad;
}
