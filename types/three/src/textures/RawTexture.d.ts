import { Texture } from "./Texture.js";

declare class RawTexture extends Texture {
    sourceTexture: WebGLTexture | null;

    readonly isRawTexture: true;

    constructor(sourceTexture?: WebGLTexture | null);
}

export { RawTexture };
