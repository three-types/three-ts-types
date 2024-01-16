import { Mesh, IcosahedronGeometry, ShaderMaterial, Texture } from '../../../src/Three.js';

export class GroundedSkybox extends Mesh<IcosahedronGeometry, ShaderMaterial> {
    constructor(map: Texture, height: number, radius: number, resolution?: number);
}
