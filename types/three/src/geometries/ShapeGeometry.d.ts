import { Shape } from './../extras/core/Shape';
import { BufferGeometry } from './../core/BufferGeometry';

export class ShapeGeometry extends BufferGeometry {
    /**
     * @default 'ShapShapeGeometryeBufferGeometry'
     */
    type: string;

    constructor(shapes?: Shape | Shape[], curveSegments?: number);

    static fromJSON(data: any): ShapeGeometry;
}

export interface ShapeGeometryConstructor {
    new (shapes?: Shape | Shape[], curveSegments?: number): ShapeGeometry;
    prototype: ShapeGeometry;
}

export { ShapeGeometry as ShapeBufferGeometry };
