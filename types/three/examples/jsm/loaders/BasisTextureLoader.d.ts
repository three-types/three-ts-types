import { CompressedTexture, Loader, LoadingManager, WebGLRenderer } from '../../../src/Three.js';

export class BasisTextureLoader extends Loader<CompressedTexture> {
    constructor(manager?: LoadingManager);
    transcoderBinary: ArrayBuffer | null;
    transcoderPath: string;
    transcoderPending: Promise<void> | null;

    workerConfig: {
        format: number;
        astcSupported: boolean;
        etcSupported: boolean;
        dxtSupported: boolean;
        pvrtcSupported: boolean;
    };
    workerLimit: number;
    workerNextTaskID: number;
    workerPool: object[];
    workerSourceURL: string;

    detectSupport(renderer: WebGLRenderer): this;
    setTranscoderPath(path: string): this;
    setWorkerLimit(workerLimit: number): this;
    dispose(): void;
}
