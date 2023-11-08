import { Matrix4, Mesh, BufferGeometry, Material, DataTexture, IUniform } from '../../../src/Three.js';

declare class BatchedMesh extends Mesh<BufferGeometry, Material> {
    isBatchedMesh: true;

    _drawRanges: { start: number; count: number }[];

    _reservedRanges: {
        vertexStart: number;
        vertexCount: number;
        indexStart: number;
        indexCount: number;
    }[];

    _visible: boolean[];
    _active: boolean[];

    _maxGeometryCount: number;
    _maxVertexCount: number;
    _maxIndexCount: number;

    _geometryInitialized: boolean;
    _geometryCount: number;
    _multiDrawCounts: Int32Array | null;
    _multiDrawStarts: Int32Array | null;
    _multiDrawCount: number;

    _matricesTexture: DataTexture | null;

    _frustumCulled: boolean;

    constructor(maxGeometryCount: number, maxVertexCount: number, maxIndexCount?: number, material?: Material);

    _initMatricesTexture(): void;
    _initializeGeometry(reference: BufferGeometry): void;
    _validateGeometry(geometry: BufferGeometry): void;

    getGeometryCount(): number;
    getVertexCount(): number;
    getIndexCount(): number;
    addGeometry(geometry: BufferGeometry, vertexCount?: number, indexCount?: number): number;
    setGeometryAt(id: number, geometry: BufferGeometry): number;
    deleteGeometry(geometryId: number): this;

    setMatrixAt(geometryId: number, matrix: Matrix4): this;
    getMatrixAt(geometryId: number, matrix: Matrix4): Matrix4;
    setVisibleAt(geometryId: number, value: boolean): this;
    getVisibleAt(geometryId: number): boolean;

    // Not implemented
    optimize(): never;
    raycast(): void; // no-op
    copy(): never;
    toJSON(): never;

    dispose(): this;
}

export { BatchedMesh };
