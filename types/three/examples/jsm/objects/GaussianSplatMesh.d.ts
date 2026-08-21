import {
    Box3,
    BufferGeometry,
    Camera,
    Color,
    InstancedBufferGeometry,
    Matrix3,
    Mesh,
    NodeMaterial,
    Renderer,
    Sphere,
    Vector3,
} from "three/webgpu";

export interface GaussianSplatMeshOptions {
    autoSort?: boolean | undefined;
}

export interface GaussianSplat {
    position: Vector3;
    covariance: Matrix3;
    color: Color;
    opacity: number;
    radius: number;
}

declare class GaussianSplatMesh extends Mesh<InstancedBufferGeometry, NodeMaterial> {
    constructor(splatGeometry: BufferGeometry, options?: GaussianSplatMeshOptions);

    readonly isGaussianSplatMesh: true;

    splatGeometry: BufferGeometry;
    boundingBox: Box3 | null;
    boundingSphere: Sphere | null;
    autoSort: boolean;

    updateSphericalHarmonics(renderer: Renderer, camera: Camera): boolean;

    getSplat(index: number, target?: Partial<GaussianSplat>): GaussianSplat;

    computeBoundingBox(): void;

    computeBoundingSphere(): void;

    updateSort(renderer: Renderer, camera: Camera): boolean;
}

export { GaussianSplatMesh };
