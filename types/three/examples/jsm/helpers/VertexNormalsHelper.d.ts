import { Object3D, LineSegments } from '../../../src/Three';

export class VertexNormalsHelper extends LineSegments {
    constructor(object: Object3D, size?: number, hex?: number);

    object: Object3D;
    size: number;

    update(): void;
}

export interface VertexNormalsHelperConstructor {
    new (object: Object3D, size?: number, hex?: number): VertexNormalsHelper;
    prototype: VertexNormalsHelper;
}
