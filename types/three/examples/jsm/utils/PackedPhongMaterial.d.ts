/**
 * `PackedPhongMaterial` inherited from THREE.MeshPhongMaterial
 *
 * @param {Object} parameters
 */
import { MeshPhongMaterial, MeshPhongMaterialParameters } from '../../../src/Three';

export class PackedPhongMaterial extends MeshPhongMaterial {
    constructor(parameters: MeshPhongMaterialParameters);
}

export interface PackedPhongMaterialConstructor {
    new (parameters: MeshPhongMaterialParameters): PackedPhongMaterial;
    prototype: PackedPhongMaterial;
}
