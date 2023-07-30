import { CubeTexture, Loader, LoadingManager, TextureDataType } from '../../../src/Three.js';

import { RGBELoader } from './RGBELoader.js';

export class HDRCubeTextureLoader extends Loader<CubeTexture, readonly string[]> {
    constructor(manager?: LoadingManager);
    hdrLoader: RGBELoader;
    type: TextureDataType;

    setDataType(type: TextureDataType): this;
}
