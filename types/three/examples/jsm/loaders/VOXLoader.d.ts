import { Data3DTexture, Loader, LoadingManager, Mesh, Object3D } from 'three';

export interface Chunk {
    palette: number[];
    size: { x: number; y: number; z: number };
    data: Uint8Array;
}

export interface VOXLoaderResult {
    chunks: Chunk[];
    scene: Object3D;
}

export class VOXLoader extends Loader<VOXLoaderResult> {
    constructor(manager?: LoadingManager);

    parse(data: ArrayBuffer): VOXLoaderResult;
}

export class VOXMesh extends Mesh {
    constructor(chunk: Chunk);
}

export class VOXData3DTexture extends Data3DTexture {
    constructor(chunk: Chunk);
}
