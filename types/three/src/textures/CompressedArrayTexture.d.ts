import { CompressedTexture } from './CompressedTexture';
import { Wrapping, CompressedPixelFormat, TextureDataType } from '../constants';

export class CompressedArrayTexture extends CompressedTexture {
    /**
     * @param mipmaps
     * @param width
     * @param height
     * @param [format=THREE.RGBAFormat]
     * @param [type=THREE.UnsignedByteType]
     */
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
