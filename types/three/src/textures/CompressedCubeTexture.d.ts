import { CompressedTexture } from './CompressedTexture';
import { CompressedPixelFormat, TextureDataType } from '../constants';

export class CompressedCubeTexture extends CompressedTexture {
    readonly isCompressedCubeTexture: true;
    readonly isCubeTexture: true;

    constructor(images: { width: number; height: number }[], format: CompressedPixelFormat, type: TextureDataType);
}
