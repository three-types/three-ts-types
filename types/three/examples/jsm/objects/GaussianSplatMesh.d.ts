import {
    Box3,
    BufferGeometry,
    Camera,
    InstancedBufferGeometry,
    Mesh,
    NodeMaterial,
    Renderer,
    Sphere,
} from "three/webgpu";

export interface GaussianSplatMeshOptions {
    autoSort?: boolean | undefined;
}

declare class GaussianSplatMesh extends Mesh<InstancedBufferGeometry, NodeMaterial> {
    constructor(splatGeometry: BufferGeometry, options?: GaussianSplatMeshOptions);

    readonly isGaussianSplatMesh: true;

    splatGeometry: BufferGeometry;
    boundingBox: Box3 | null;
    boundingSphere: Sphere | null;
    autoSort: boolean;

    updateSphericalHarmonics(renderer: Renderer, camera: Camera): boolean;

    computeBoundingBox(): void;

    computeBoundingSphere(): void;

    updateSort(renderer: Renderer, camera: Camera): boolean;
}

export { GaussianSplatMesh };
