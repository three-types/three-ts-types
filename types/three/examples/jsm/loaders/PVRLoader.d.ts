import { LoadingManager, CompressedTextureLoader, CompressedPixelFormat } from '../../../src/Three';

export interface PVR {
    mipmaps: ImageData[];
    width: number;
    height: number;
    format: CompressedPixelFormat;
    mipmapCount: number;
    isCubemap: boolean;
}

export class PVRLoader extends CompressedTextureLoader {
    constructor(manager?: LoadingManager);

    parse(buffer: ArrayBuffer, loadMipmaps: boolean): PVR;
}
