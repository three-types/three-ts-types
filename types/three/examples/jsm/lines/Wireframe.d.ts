import { Mesh } from '../../../src/Three';

import { LineMaterial } from './LineMaterial';
import { LineSegmentsGeometry } from './LineSegmentsGeometry';

export class Wireframe extends Mesh {
    constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial);
    readonly isWireframe: true;

    computeLineDistances(): this;
}

export interface WireframeConstructor {
    new (geometry?: LineSegmentsGeometry, material?: LineMaterial): Wireframe;
    prototype: Wireframe;
}
