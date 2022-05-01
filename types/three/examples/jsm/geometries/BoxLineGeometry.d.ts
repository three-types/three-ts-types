import { BufferGeometry } from '../../../src/Three';

export class BoxLineGeometry extends BufferGeometry {
    constructor(
        width?: number,
        height?: number,
        depth?: number,
        widthSegments?: number,
        heightSegments?: number,
        depthSegments?: number,
    );
}

export interface BoxLineGeometryConstructor {
    new (
        width?: number,
        height?: number,
        depth?: number,
        widthSegments?: number,
        heightSegments?: number,
        depthSegments?: number,
    ): BoxLineGeometry;
    prototype: BoxLineGeometry;
}
