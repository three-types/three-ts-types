import { BufferGeometry, Loader, LoadingManager } from "three";

export class DRACOLoader extends Loader<BufferGeometry> {
    constructor(manager?: LoadingManager);

    setDecoderPath(path: string): DRACOLoader;

    /**
     * @deprecated setDecoderConfig to has been deprecated and will be removed in r194.
     */
    setDecoderConfig(config: object): DRACOLoader;

    setWorkerLimit(workerLimit: number): DRACOLoader;

    load(
        url: string,
        onLoad?: (data: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (err: unknown) => void,
    ): void;

    parse(
        buffer: ArrayBuffer,
        onLoad?: (geometry: BufferGeometry) => void,
        onError?: (err: unknown) => void,
    ): void;

    preload(): DRACOLoader;
    dispose(): DRACOLoader;
}
