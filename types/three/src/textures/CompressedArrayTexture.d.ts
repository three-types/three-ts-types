import { CompressedTexture } from './CompressedTexture';
import { Wrapping, CompressedPixelFormat, TextureDataType } from '../constants';

export class CompressedArrayTexture extends CompressedTexture {
    constructor(
        mipmaps: ImageData[],
        width: number,
        height: number,
        depth: number,
        format?: CompressedPixelFormat,
        type?: TextureDataType,
    );

    wrapR: Wrapping;

    readonly isCompressedArrayTexture: true;
}
