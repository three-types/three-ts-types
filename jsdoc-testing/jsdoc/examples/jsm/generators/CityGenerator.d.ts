/**
 * Lays out a grid of city blocks and fills each lot with a {@link SkyscraperGenerator}
 * tower of its own seed, height and footprint, optionally on raised sidewalk
 * slabs (curbs). Returns a `THREE.Group` ready to add to a scene.
 *
 * Pass a building material to dress the towers; the sidewalks dress themselves
 * via {@link SidewalkGenerator}. The layout is exposed as
 * {@link CityGenerator#layout} so the surrounding scene (road markings, etc.)
 * can align to the same grid.
 *
 * ```js
 * const city = new CityGenerator( { seed: 1 } );
 * scene.add( city.build( materials ) );
 * ```
 */
export class CityGenerator {
    constructor(parameters?: {});
    parameters: {
        seed: number;
        street: number;
        lot: number;
        lotsX: number;
        lotsZ: number;
        blocksX: number;
        blocksZ: number;
        curbHeight: number;
        curbRadius: number;
        sidewalkWidth: number;
    };
    layout: {
        street: any;
        lot: any;
        lotsX: any;
        lotsZ: any;
        blocksX: any;
        blocksZ: any;
        blockW: number;
        blockD: number;
        sidewalkWidth: any;
        innerLotX: number;
        innerLotZ: number;
        cityW: number;
        cityD: number;
    };
    /**
     * The city seed shared by building and proxy materials. Pass this to
     * {@link createBuildingMaterial} to update the palette when rebuilding.
     *
     * @type {UniformNode<uint>}
     */
    seedNode: UniformNode<any>;
    generators: any[];
    towers: any[];
    sidewalk: SidewalkGenerator;
    furniture: {
        streetlight: StreetlightGenerator;
        trafficlight: TrafficlightGenerator;
        trashcan: TrashcanGenerator;
        bench: BenchGenerator;
        hydrant: HydrantGenerator;
        tree: StreetTreeGenerator;
        car: CarGenerator;
        person: PersonGenerator;
    };
    group: Group | null;
    build(materials?: {}): Group;
    /**
     * Builds a lightweight stand-in for the city: one instanced box per tower,
     * sized to match, in a single draw call. Intended for cheap global-illumination
     * bakes, where the detailed facades and street furniture are unnecessary and the
     * boxes still cast the same street shadows and bounce the same warm fill.
     *
     * Call after {@link CityGenerator#build}, which records the tower boxes.
     *
     * @return {InstancedMesh} The proxy mesh.
     */
    buildProxy(): InstancedMesh;
    buildFurniture(random: any): Group;
    dispose(): void;
}
export namespace CityGenerator {
    namespace defaults {
        let seed: number;
        let street: number;
        let lot: number;
        let lotsX: number;
        let lotsZ: number;
        let blocksX: number;
        let blocksZ: number;
        let curbHeight: number;
        let curbRadius: number;
        let sidewalkWidth: number;
    }
}
/**
 * The shared material every tower in a {@link CityGenerator} is dressed with: the per-lot
 * {@link buildingColorNode} resolved once per vertex on a skyscraper material.
 *
 * @param {Object} layout - The city layout.
 * @param {number|Node<uint>} [seed=0] - A fixed seed, or {@link CityGenerator#seedNode} for a changing city.
 * @return {MeshStandardNodeMaterial} The building material.
 */
export function createBuildingMaterial(layout: Object, seed?: number | Node<any>): MeshStandardNodeMaterial;
/**
 * The road surface: wet asphalt with lane lines and crosswalks aligned to a
 * {@link CityGenerator} layout. Apply it to a ground plane sized to the city.
 */
export function createRoadMaterial(layout: any): MeshStandardNodeMaterial;
import { SidewalkGenerator } from './city/SidewalkGenerator.js';
import { StreetlightGenerator } from './city/StreetlightGenerator.js';
import { TrafficlightGenerator } from './city/TrafficlightGenerator.js';
import { TrashcanGenerator } from './city/TrashcanGenerator.js';
import { BenchGenerator } from './city/BenchGenerator.js';
import { HydrantGenerator } from './city/HydrantGenerator.js';
import { StreetTreeGenerator } from './city/StreetTreeGenerator.js';
import { CarGenerator } from './city/CarGenerator.js';
import { PersonGenerator } from './city/PersonGenerator.js';
import { Group } from 'three';
import { InstancedMesh } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
