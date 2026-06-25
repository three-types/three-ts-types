/**
 * Generates the raised sidewalk for a city's blocks: per block, a rounded-corner concrete
 * slab rimmed by a distinct granite kerbstone that stands proud of the walking surface and
 * drops to the road. Instanced across a list of placements and dressed with its own
 * procedural material ( poured concrete flags, scored expansion joints, granite curb ).
 * Returns a `THREE.Group` of two instanced meshes — the walking slab and the curb.
 *
 * Unlike the building generator, this one owns its materials: the slab and curb
 * geometry and the TSL that shades them live together here.
 *
 * ```js
 * const sidewalk = new SidewalkGenerator( { width: 90, depth: 60, height: 0.5 } );
 * scene.add( sidewalk.build( placements ) ); // placements: Matrix4[]
 * ```
 */
export class SidewalkGenerator {
    constructor(parameters?: {});
    parameters: {
        width: number;
        depth: number;
        height: number;
        radius: number;
        curbWidth: number;
        curbLip: number;
    };
    material: MeshStandardNodeMaterial | null;
    curbMaterial: MeshStandardNodeMaterial | null;
    mesh: Group | null;
    build(placements: any): Group;
    dispose(): void;
}
export namespace SidewalkGenerator {
    namespace defaults {
        let width: number;
        let depth: number;
        let height: number;
        let radius: number;
        let curbWidth: number;
        let curbLip: number;
    }
}
import { MeshStandardNodeMaterial } from 'three/webgpu';
import { Group } from 'three/webgpu';
