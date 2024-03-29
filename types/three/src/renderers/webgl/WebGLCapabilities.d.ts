export interface WebGLCapabilitiesParameters {
    precision?: string | undefined;
    logarithmicDepthBuffer?: boolean | undefined;
}

export class WebGLCapabilities {
    constructor(gl: WebGLRenderingContext, extensions: any, parameters: WebGLCapabilitiesParameters);

    readonly isWebGL2: boolean;

    getMaxAnisotropy: () => number;
    getMaxPrecision: (precision: string) => string;

    precision: string;
    logarithmicDepthBuffer: boolean;

    maxTextures: number;
    maxVertexTextures: number;
    maxTextureSize: number;
    maxCubemapSize: number;

    maxAttributes: number;
    maxVertexUniforms: number;
    maxVaryings: number;
    maxFragmentUniforms: number;

    vertexTextures: boolean;

    maxSamples: number;
}
