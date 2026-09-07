/**
 * Bakes a procedural mountain range into a single {@link THREE.BufferGeometry} and
 * returns a `THREE.Group` ready to add to a scene.
 *
 * The heightfield is a derivative-damped fractal sum ( Quilez's fake erosion ): each
 * octave is suppressed where the running slope is already steep, concentrating detail
 * into weathered ridgelines, and a low-frequency domain warp makes those ridges
 * meander. A few passes of thermal ( talus ) erosion then relax any slope past the
 * angle of repose, settling the fractal's needle-spikes into real crests.
 *
 * The grid is triangulated with alternating quad diagonals ( a diamond pattern ), so a
 * coarse mesh holds its silhouette without a one-way grain. The surface shades itself
 * from altitude and slope in TSL — grass, forest, rock, scree and snow, with detail
 * normals and aerial perspective — so no material or textures are needed.
 *
 * The baked height grid is exposed through {@link TerrainGenerator#sampleHeight} so a
 * scattered forest ( or anything else ) can sit exactly on the surface.
 *
 * ```js
 * const terrain = new TerrainGenerator( { seed: 1 } );
 * scene.add( terrain.build() );
 * ```
 */
export class TerrainGenerator {
    constructor(parameters?: {});
    parameters: {
        seed: number;
        size: number;
        segments: number;
        heightScale: number;
        frequency: number;
        octaves: number;
        lacunarity: number;
        gain: number;
        erosion: number;
        warp: number;
        valleyBias: number;
        seaLevel: number;
        talus: number;
        talusPasses: number;
    };
    minHeight: import("three/webgpu").UniformNode;
    maxHeight: import("three/webgpu").UniformNode;
    material: MeshStandardNodeMaterial;
    geometry: BufferGeometry | null;
    group: Group | null;
    build(): Group;
    heights: Float32Array<ArrayBuffer> | undefined;
    gridSize: number | undefined;
    minY: number | undefined;
    maxY: number | undefined;
    sampleHeight(x: any, z: any): number;
    sampleSlope(x: any, z: any): number;
    dispose(): void;
}
export namespace TerrainGenerator {
    namespace defaults {
        let seed: number;
        let size: number;
        let segments: number;
        let heightScale: number;
        let frequency: number;
        let octaves: number;
        let lacunarity: number;
        let gain: number;
        let erosion: number;
        let warp: number;
        let valleyBias: number;
        let seaLevel: number;
        let talus: number;
        let talusPasses: number;
    }
}
import { MeshStandardNodeMaterial } from 'three/webgpu';
import { BufferGeometry } from 'three';
import { Group } from 'three';
