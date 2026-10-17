/**
 * A low-poly car fleet with lofted bodies, circular wheel arches, curved
 * windscreens and recessed alloy wheels. Separate cabin panels define the
 * windows and their frames. Two body types ( sedan and SUV ) are mixed
 * deterministically across the fleet, and the taxi colour gets its own sedan with
 * a roof sign, so a parked row reads as different vehicles rather than one mould.
 *
 * Each geometry is built once per type and shared; cars are grouped by body
 * type with per-instance paint, so each group is a single instanced draw that
 * assigns paint, glass, tyres and lamps using a baked `partId`, panel UVs and
 * canonical-space masks.
 *
 * The canonical model stands with its wheels on `y = 0`, centred in X / Z, facing
 * `+Z`, so a placement whose local `+Z` faces the road parks it nose-out.
 *
 * ```js
 * const cars = new CarGenerator();
 * scene.add( cars.build( placements ) ); // placements: { matrix: Matrix4, color }[]
 * ```
 */
export class CarGenerator {
    constructor(parameters?: {});
    parameters: {};
    geometries: Map<any, any>;
    materials: Map<any, any>;
    mesh: Group | null;
    build(cars: any): Group;
    dispose(): void;
}
export namespace CarGenerator {
    let defaults: {};
    let taxiColor: number;
}
import { Group } from 'three';
