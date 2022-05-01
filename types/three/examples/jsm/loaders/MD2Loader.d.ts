import { BufferGeometry, Loader, LoadingManager } from '../../../src/Three';

export class MD2Loader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (geometry: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
    parse(data: ArrayBuffer): BufferGeometry;
}

export interface MD2LoaderConstructor {
    new (manager?: LoadingManager): MD2Loader;
    prototype: MD2Loader;
}
