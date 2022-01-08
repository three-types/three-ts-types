import { IUniform } from '../renderers/shaders/UniformsLib';
import { MaterialParameters, Material } from './Material';
import { GLSLVersion } from '../constants';

export interface TUniforms {
    [uniform: string]: IUniform;
}

// transform { uniform1: type1, uniform2: type2 } to { uniform1: { value: type1 }, ...}
export type WrapUniforms<T extends { [uniform: string]: any }> = {
    [U in keyof T]: T[U] extends IUniform ? T[U] : IUniform<T[U]>;
};

// replace null types by any (typically used by textures)
export type AvoidNullUniforms<T extends TUniforms> = {
    [U in keyof T]: IUniform<T[U]['value'] extends null ? any : T[U]['value']>;
};

export type ExtractUniforms<T> = AvoidNullUniforms<
    WrapUniforms<T extends ShaderMaterialParametersLike<infer U> ? U : T>
>;

export interface ShaderMaterialParametersLike<Uniforms extends TUniforms> {
    uniforms: Uniforms;
}

export type ShaderMaterialParameters<Uniforms extends TUniforms> = MaterialParameters &
    // if we have uniforms type defined in var declaration then this paramater is required
    // keyof { [string] } will result in string | number, since uniform names can't be numbers we can safely determine the type
    // check for extends never instead of extends number because never always extends everything
    // uniforms: Type | undefined !== uniforms?: Type
    (Exclude<keyof Uniforms, string> extends never ? { uniforms: Uniforms } : { uniforms?: Uniforms }) & {
        vertexShader?: string;
        fragmentShader?: string;
        linewidth?: number;
        wireframe?: boolean;
        wireframeLinewidth?: number;
        lights?: boolean;
        clipping?: boolean;

        extensions?: {
            derivatives?: boolean;
            fragDepth?: boolean;
            drawBuffers?: boolean;
            shaderTextureLOD?: boolean;
        };
        glslVersion?: GLSLVersion;
    };

export class ShaderMaterial<
    T extends {} = TUniforms,
    Uniforms extends TUniforms = ExtractUniforms<T>,
> extends Material {
    constructor(parameters?: ShaderMaterialParameters<Uniforms>);

    /**
     * @default 'ShaderMaterial'
     */
    type: string;

    /**
     * @default {}
     */
    defines: { [key: string]: any };

    /**
     * @default {}
     */
    uniforms: AvoidNullUniforms<Uniforms>;
    // uniforms: Exclude<keyof Uniforms, string> extends never
    //     ? AvoidNullUniforms<Uniforms>
    //     : Partial<AvoidNullUniforms<Uniforms>>;
    vertexShader: string;
    fragmentShader: string;

    /**
     * @default 1
     */
    linewidth: number;

    /**
     * @default false
     */
    wireframe: boolean;

    /**
     * @default 1
     */
    wireframeLinewidth: number;

    /**
     * @default false
     */
    fog: boolean;

    /**
     * @default false
     */
    lights: boolean;

    /**
     * @default false
     */
    clipping: boolean;

    /**
     * @deprecated Use {@link ShaderMaterial#extensions.derivatives extensions.derivatives} instead.
     */
    derivatives: any;

    /**
     * @default { derivatives: false, fragDepth: false, drawBuffers: false, shaderTextureLOD: false }
     */
    extensions: {
        derivatives: boolean;
        fragDepth: boolean;
        drawBuffers: boolean;
        shaderTextureLOD: boolean;
    };

    /**
     * @default { 'color': [ 1, 1, 1 ], 'uv': [ 0, 0 ], 'uv2': [ 0, 0 ] }
     */
    defaultAttributeValues: any;

    /**
     * @default undefined
     */
    index0AttributeName?: string;

    /**
     * @default false
     */
    uniformsNeedUpdate: boolean;

    /**
     * @default null
     */
    glslVersion: GLSLVersion | null;

    isShaderMaterial: boolean;

    setValues(parameters: ShaderMaterialParameters<Uniforms>): void;
    toJSON(meta: any): any;
}
