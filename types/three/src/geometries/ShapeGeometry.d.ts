import { Shape } from './../extras/core/Shape.js';
import { BufferGeometry } from './../core/BufferGeometry.js';

export class ShapeGeometry extends BufferGeometry {
    /**
     * @default 'ShapShapeGeometryeBufferGeometry'
     */
    type: string;

    constructor(shapes?: Shape | Shape[], curveSegments?: number);

    static fromJSON(data: any): ShapeGeometry;
}
