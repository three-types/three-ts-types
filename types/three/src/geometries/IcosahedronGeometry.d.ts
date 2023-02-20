import { PolyhedronGeometry } from './PolyhedronGeometry.js';

export class IcosahedronGeometry extends PolyhedronGeometry {
    /**
     * @param [radius=1]
     * @param [detail=0]
     */
    constructor(radius?: number, detail?: number);

    /**
     * @default 'IcosahedronGeometry'
     */
    type: string;

    static fromJSON(data: any): IcosahedronGeometry;
}
