import { Matrix4, Mesh, BufferGeometry, Material, DataTexture, IUniform } from '../../../src/Three.js';

declare class BatchedMesh extends Mesh<BufferGeometry, Material> {
    _vertexStarts: number[];
    _vertexCounts: number[];
    _indexStarts: number[];
    _indexCounts: number[];
    _visibles: boolean[];
    _alives: boolean[];
    _maxGeometryCount: number;
    _maxVertexCount: number;
    _maxIndexCount: number;
    _geometryInitialized: boolean;
    _geometryCount: number;
    _vertexCount: number;
    _indexCount: number;
    _matrices: Matrix4[];
    _matricesArray: Float32Array | null;
    _matricesTexture: DataTexture | null;
    _matricesTextureSize: number | null;
    _customUniforms: Record<string, IUniform>;
    constructor(maxGeometryCount: number, maxVertexCount: number, maxIndexCount?: number, material?: Material);
    _initMatricesTexture(): void;
    _initShader(): void;
    getGeometryCount(): number;
    getVertexCount(): number;
    getIndexCount(): number;
    applyGeometry(geometry: BufferGeometry): number;
    deleteGeometry(geometryId: number): this;
    optimize(): this;
    setMatrixAt(geometryId: number, matrix: Matrix4): this;
    getMatrixAt(geometryId: number, matrix: Matrix4): Matrix4;
    setVisibleAt(geometryId: number, visible: boolean): this;
    getVisibleAt(geometryId: number): boolean;
    copy(source: BatchedMesh): this;
    toJSON(meta: any): any;
    dispose(): this;
}

export { BatchedMesh };
