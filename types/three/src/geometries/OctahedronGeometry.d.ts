import { PolyhedronGeometry } from './PolyhedronGeometry';

export class OctahedronGeometry extends PolyhedronGeometry {
    /**
     * @param [radius=1]
     * @param [detail=0]
     */
    constructor(radius?: number, detail?: number);

    /**
     * @default 'OctahedronGeometry'
     */
    type: string;

    static fromJSON(data: any): OctahedronGeometry;
}

export interface OctahedronGeometryConstructor {
    new (radius?: number, detail?: number): OctahedronGeometry;
    prototype: OctahedronGeometry;
}

export { OctahedronGeometry as OctahedronBufferGeometry };
