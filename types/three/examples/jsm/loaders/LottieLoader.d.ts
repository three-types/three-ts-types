import { CanvasTexture, Loader, LoadingManager } from '../../../src/Three.js';

export class LottieLoader extends Loader<CanvasTexture> {
    constructor(manager?: LoadingManager);

    setQuality(value: number): void;
}
