/**
 * Generates intricate, tripartite "Beaux-Arts / Neo-Gothic" terracotta
 * skyscrapers from a small set of parameters.
 *
 * The mass is read as a footprint polygon (a rectangle with one chamfered
 * corner) split into vertical faces, each split into three tiers — a tall
 * arcaded base, a repeating shaft and an ornate crown — then into floors and
 * bays. A handful of authored pieces (a pier, a window, a cornice profile, a
 * gothic arch) are instanced across the whole tower, then baked — together with
 * the bespoke base arcade — into a single non-indexed BufferGeometry tagged with
 * a per-vertex `partId` ({@link PartId}) so one material can shade every zone.
 *
 * The generator is material agnostic — it only produces geometry. Pass a single
 * material (e.g. a TSL node material that branches on `partId`) to dress it.
 *
 * ```js
 * const generator = new SkyscraperGenerator( { seed: 35, totalHeight: 140 }, material );
 * scene.add( generator.build() ); // a single Mesh
 * ```
 */
export class SkyscraperGenerator {
    constructor(parameters?: {}, material?: null);
    parameters: {};
    material: any;
    mesh: Mesh | null;
    setParameters(parameters: any): this;
    build(): Mesh;
    rebuild(): Mesh;
    dispose(): void;
}
export namespace SkyscraperGenerator {
    namespace defaults {
        let seed: number;
        let totalHeight: number;
        let floorHeight: number;
        let bayWidth: number;
        let stringCourseEvery: number;
        let chamferWidth: number;
        let chamferCornerX: number;
        let chamferCornerZ: number;
        let setbackDepth: number;
        let acChance: number;
    }
}
/**
 * The facade material: a single MeshStandardNodeMaterial that reads the baked
 * per-vertex `partId` and reproduces every zone — procedural terracotta brickwork
 * on the walls and piers, smooth dressed stone on the window frames and ornament,
 * dark glazing, and grey AC units — all dressed with world-space
 * weathering. One material covers the whole building ( and a whole city ), which is
 * what makes it compute-rasterizer friendly. `buildingBase` is the tower's flat
 * masonry colour as a TSL node: pass a `uniform( Color )` for a single tower, or a
 * per-fragment palette pick for a city, so the same material dresses both.
 *
 * @param {Node<vec3>} [buildingBase] - The flat masonry colour of the tower.
 * @param {Object} [options] - The features of the material, cheaper materials leave some out.
 * @param {boolean|string} [options.interiors=true] - Whether the windows show raymarched rooms, `'average'` shows the average
 * colour and the light of each room without the raymarch, for distant towers. `false` shows dark glass.
 * @param {boolean} [options.weathering=true] - Whether the surfaces are weathered by noise ( tone, soot, grime, dust ).
 * @param {boolean} [options.relief=true] - Whether the brickwork and the AC louvers have a bump relief.
 * @return {MeshStandardNodeMaterial} The facade material.
 */
export function createSkyscraperMaterial(buildingBase?: Node<any>, { interiors, weathering, relief }?: {
    interiors?: string | boolean | undefined;
    weathering?: boolean | undefined;
    relief?: boolean | undefined;
}): MeshStandardNodeMaterial;
/**
 * The NYC masonry palette every tower is dressed from ( hex colours ): limestone-dominant
 * with terracotta accents. Shared by the single-tower example and {@link CityGenerator}'s
 * building material so both stay in sync.
 */
export const buildingPalette: number[];
/** Picks one {@link buildingPalette} colour ( a hex number ) for a tower from its seed. */
export function pickBuildingColor(seed: any): number;
import { Mesh } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
