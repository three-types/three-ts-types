import { BufferGeometry, Camera, InstancedBufferGeometry, Mesh, NodeMaterial, Renderer } from "three/webgpu";

export interface GaussianSplatMeshOptions {
    autoSort?: boolean | undefined;
}

declare class GaussianSplatMesh extends Mesh<InstancedBufferGeometry, NodeMaterial> {
    constructor(splatGeometry: BufferGeometry, options?: GaussianSplatMeshOptions);

    readonly isGaussianSplatMesh: true;

    splatGeometry: BufferGeometry;
    autoSort: boolean;

    updateSort(renderer: Renderer, camera: Camera): boolean;
}

export { GaussianSplatMesh };
