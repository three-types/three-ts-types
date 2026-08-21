import { BufferGeometry, Loader, LoadingManager } from "three";

declare class PLYGaussianSplatLoader extends Loader<BufferGeometry> {
    constructor(manager?: LoadingManager);

    parse(data: ArrayBuffer | string): BufferGeometry;
}

export { PLYGaussianSplatLoader };
