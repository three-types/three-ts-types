/**
 * Grows a procedural tree skeleton — trunk, branches and twigs, each swept as a tapered
 * tube — and bakes it into one non-indexed {@link BufferGeometry} (position and normal
 * only), ready to instance into a forest. It produces *branches only*; add foliage as a
 * separate layer.
 *
 * The branching is deterministic for a given `seed`: a recursive sweep lays down gently
 * curved tubes with a parallel-transport frame (so they never twist), forking by the
 * pipe model (each child much thinner than its parent), spreading children along the
 * upper part of each branch with a golden-angle roll, and pulling them back up toward
 * the light. A flared root, non-linear taper and gravity droop fill in the character.
 *
 * Parameters are set with a fluent builder: a `set<Param>()` exists for every default
 * ( `setSeed`, `setLevels`, `setChildren`, … ), each returning `this` for chaining.
 *
 * Each `build()` returns a fresh, independent mesh that the caller owns, so one
 * generator can be re-parametrized and built repeatedly to grow a varied stand:
 *
 * ```js
 * const generator = new TreeGenerator( material );
 * const oak = generator.setSeed( 1 ).setLevels( 4 ).build();
 * const pine = generator.setSeed( 2 ).setLevels( 5 ).build();
 * ```
 */
export class TreeGenerator {
    constructor(material?: null);
    material: any;
    parameters: {};
    build(): Mesh;
}
export namespace TreeGenerator {
    namespace defaults {
        let seed: number;
        let levels: number;
        let children: number[];
        let branchAngle: number[];
        let angleVariance: number;
        let lengthRatio: number;
        let trunkLength: number;
        let trunkRadius: number;
        let taper: number;
        let taperCurve: number;
        let rootFlare: number;
        let flareFrac: number;
        let radiusExponent: number;
        let minRadius: number;
        let minLength: number;
        let droop: number;
        let upPull: number;
        let gnarl: number[];
        let radialSegments: number;
        let sectionLength: number;
        let childStart: number;
        let trunkClear: number;
    }
}
/**
 * A simple bark material for a {@link TreeGenerator} mesh: a low-saturation brown with a
 * faint, vertically-stretched grain, so trunks read near-black against bright fog.
 *
 * @param {Object} [parameters] - `barkColor` ( a hex, THREE.Color or TSL node ).
 * @return {MeshStandardNodeMaterial}
 */
export function createTreeMaterial(parameters?: Object): MeshStandardNodeMaterial;
import { Mesh } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
