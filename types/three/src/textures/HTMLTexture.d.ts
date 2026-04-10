import {
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    PixelFormat,
    TextureDataType,
    Wrapping,
} from "../constants";
import { Texture } from "./Texture.js";

declare class HTMLTexture extends Texture<HTMLElement> {
    readonly isHTMLTexture: boolean;

    constructor(
        image?: HTMLElement,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
    );
}

export { HTMLTexture };
