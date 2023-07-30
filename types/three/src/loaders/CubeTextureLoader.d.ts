import { Loader } from './Loader.js';
import { LoadingManager } from './LoadingManager.js';
import { CubeTexture } from './../textures/CubeTexture.js';

export class CubeTextureLoader extends Loader<CubeTexture, readonly string[]> {
    constructor(manager?: LoadingManager);
}
