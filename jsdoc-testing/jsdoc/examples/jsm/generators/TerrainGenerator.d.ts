/**
 * Bakes a procedural mountain range into a single mesh, returned in a `THREE.Group`.
 * Domain-warped, derivative-damped noise shapes the ridges; thermal erosion relaxes
 * steep slopes. A TSL material shades grass, rock and snow from altitude and slope.
 *
 * The baked grid is available through {@link TerrainGenerator#sampleHeight} for
 * placing a forest or other objects on the terrain.
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
