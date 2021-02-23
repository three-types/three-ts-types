import { DataTexture3D, Mesh, Loader, LoadingManager } from '../../../src/Three';

export class VOXLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (chunks: object[]) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object[]>;
    parse(data: ArrayBuffer): object[];
}

export class VOXMesh extends Mesh {
    constructor(chunk: object);
}

export class VOXDataTexture3D extends DataTexture3D {
    constructor(chunk: object);
}
