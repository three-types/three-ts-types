import { BufferGeometry, Loader, LoadingManager } from '../../../src/Three';

export class VTKLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (geometry: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
    parse(data: ArrayBuffer | string, path: string): BufferGeometry;
}

export interface VTKLoaderConstructor {
    new (manager?: LoadingManager): VTKLoader;
    prototype: VTKLoader;
}
