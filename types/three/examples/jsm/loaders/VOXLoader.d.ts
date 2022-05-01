import { Data3DTexture, Mesh, Loader, LoadingManager } from '../../../src/Three';

export interface Chunk {
    palette: number[];
    size: { x: number; y: number; z: number };
    data: Uint8Array;
}

export class VOXLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (chunks: Chunk[]) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object[]>;
    parse(data: ArrayBuffer): object[];
}

export interface VOXLoaderConstructor {
    new (manager?: LoadingManager): VOXLoader;
    prototype: VOXLoader;
}

export class VOXMesh extends Mesh {
    constructor(chunk: Chunk);
}

export interface VOXMeshConstructor {
    new (chunk: Chunk): VOXMesh;
    prototype: VOXMesh;
}

export class VOXData3DTexture extends Data3DTexture {
    constructor(chunk: Chunk);
}

export interface VOXData3DTextureConstructor {
    new (chunk: Chunk): VOXData3DTexture;
    prototype: VOXData3DTexture;
}
