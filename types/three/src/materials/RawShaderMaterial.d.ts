import { ShaderMaterial, ShaderMaterialParameters } from "./ShaderMaterial.js";

export class RawShaderMaterial<T extends Record<string, IUniform<any>> = any> extends ShaderMaterial {
    declare uniforms: T;
    
    constructor(parameters?: Omit<ShaderMaterialParameters, 'uniforms'> & { uniforms: T });

    /**
     * Read-only flag to check if a given object is of type {@link RawShaderMaterial}.
     * @remarks This is a _constant_ value
     * @defaultValue `true`
     */
    readonly isRawShaderMaterial: true;
}
