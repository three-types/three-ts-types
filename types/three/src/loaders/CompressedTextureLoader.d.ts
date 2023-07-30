import { Loader } from './Loader.js';
import { LoadingManager } from './LoadingManager.js';
import { CompressedTexture } from './../textures/CompressedTexture.js';

export class CompressedTextureLoader extends Loader<CompressedTexture> {
    constructor(manager?: LoadingManager);
}
