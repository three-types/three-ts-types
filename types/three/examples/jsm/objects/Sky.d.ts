import { BoxGeometry, Mesh, ShaderMaterial } from '../../../src/Three';

export class Sky extends Mesh {
    constructor();

    geometry: BoxGeometry;
    material: ShaderMaterial;

    static SkyShader: object;
}

export interface SkyConstructor {
    new (): Sky;
    prototype: Sky;
}
