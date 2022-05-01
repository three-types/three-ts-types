import { Mesh } from 'three';

export class HTMLMesh extends Mesh {
    constructor(dom: HTMLElement);
    dispose(): void;
}

export interface HTMLMeshConstructor {
    new (dom: HTMLElement): HTMLMesh;
    prototype: HTMLMesh;
}
