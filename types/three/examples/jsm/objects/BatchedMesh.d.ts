import { Matrix4, Mesh, BufferGeometry, Material, DataTexture, Box3, Sphere } from '../../../src/Three.js';

declare class BatchedMesh extends Mesh<BufferGeometry, Material> {
    isBatchedMesh: true;
    perObjectFrustumCulled: boolean;
    boundingBox: Box3 | null;
    boundingSphere: Sphere | null;

    _drawRanges: { start: number; count: number }[];

    _reservedRanges: {
        vertexStart: number;
        vertexCount: number;
        indexStart: number;
        indexCount: number;
    }[];

    _visible: boolean[];
    _active: boolean[];
    _bounds: { boxInitialized: boolean; box: Box3; sphereInitialized: boolean; sphere: Sphere }[];

    _maxGeometryCount: number;
    _maxVertexCount: number;
    _maxIndexCount: number;

    _geometryInitialized: boolean;
    _geometryCount: number;
    _multiDrawCounts: Int32Array | null;
    _multiDrawStarts: Int32Array | null;
    _multiDrawCount: number;

    _matricesTexture: DataTexture | null;

    constructor(maxGeometryCount: number, maxVertexCount: number, maxIndexCount?: number, material?: Material);

    _initMatricesTexture(): void;
    _initializeGeometry(reference: BufferGeometry): void;
    _validateGeometry(geometry: BufferGeometry): void;

    getGeometryCount(): number;
    getVertexCount(): number;
    getIndexCount(): number;

    computeBoundingBox(): void;
    computeBoundingSphere(): void;

    addGeometry(geometry: BufferGeometry, vertexCount?: number, indexCount?: number): number;
    setGeometryAt(id: number, geometry: BufferGeometry): number;
    deleteGeometry(geometryId: number): this;

    getBoundingBoxAt(id: number, target: Box3): Box3;
    getBoundingSphereAt(id: number, target: Sphere): Sphere;

    optimize(): never; // Not implemented

    setMatrixAt(geometryId: number, matrix: Matrix4): this;
    getMatrixAt(geometryId: number, matrix: Matrix4): Matrix4;
    setVisibleAt(geometryId: number, value: boolean): this;
    getVisibleAt(geometryId: number): boolean;

    raycast(): void; // no-op

    copy(source: this): this;

    dispose(): this;
}

export { BatchedMesh };
