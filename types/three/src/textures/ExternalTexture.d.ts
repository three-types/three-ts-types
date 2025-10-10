/// <reference types="@webgpu/types" />

import { Texture } from "./Texture.js";

declare class ExternalTexture extends Texture {
    sourceTexture: WebGLTexture | Texture | null;

    readonly isExternalTexture: true;

    constructor(sourceTexture?: WebGLTexture | Texture | null);
}

export { ExternalTexture };
