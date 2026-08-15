import { BufferGeometry, Loader, LoadingManager } from "three";

declare class SPZLoader extends Loader<BufferGeometry> {
    constructor(manager?: LoadingManager);

    parse(buffer: ArrayBuffer): BufferGeometry;

    parseRawSPZ(bytes: Uint8Array): BufferGeometry;
}

export { SPZLoader };
