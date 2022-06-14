import { LoadingManager, CompressedTextureLoader, PixelFormat, CompressedPixelFormat } from '../../../src/Three';

export interface KTX {
    mipmaps: ImageData[];
    width: number;
    height: number;
    format: PixelFormat | CompressedPixelFormat;
    mipmapCount: number;
    isCubemap: boolean;
}

export class KTXLoader extends CompressedTextureLoader {
    constructor(manager?: LoadingManager);

    parse(buffer: ArrayBuffer, loadMipmaps: boolean): KTX;
}
