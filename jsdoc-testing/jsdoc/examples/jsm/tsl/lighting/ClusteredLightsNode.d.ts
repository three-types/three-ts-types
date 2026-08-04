export default ClusteredLightsNode;
/**
 * TSL function that creates a clustered lights node.
 *
 * @tsl
 * @function
 * @param {number} [maxLights=1024] - Maximum number of point lights.
 * @param {number} [tileSize=32] - Screen tile size in pixels.
 * @param {number} [zSlices=24] - Depth slice count.
 * @param {number} [maxLightsPerCluster=64] - Per-cluster light-list capacity.
 * @return {ClusteredLightsNode} The clustered lights node.
 */
export const clusteredLights: any;
/**
 * A custom version of `LightsNode` implementing Forward+ clustered shading:
 * the view frustum is subdivided into a 3D grid of clusters (X × Y screen tiles
 * times an exponentially-spaced set of Z depth slices), and each cluster holds
 * only the point lights whose spheres intersect it. At shading time each fragment
 * looks up its cluster and loops over just that cluster's lights. Unlike 2D tiled
 * lighting, clustered shading culls lights that share screen pixels but lie at
 * different depths — suitable for 3D scenes with real depth complexity.
 *
 * @augments LightsNode
 * @three_import import { clusteredLights } from 'three/addons/tsl/lighting/ClusteredLightsNode.js';
 */
declare class ClusteredLightsNode extends LightsNode {
    /**
     * Constructs a new clustered lights node.
     *
     * @param {number} [maxLights=1024] - Maximum number of point lights.
     * @param {number} [tileSize=32] - Screen tile size in pixels (cluster XY size).
     * @param {number} [zSlices=24] - Number of exponential depth slices.
     * @param {number} [maxLightsPerCluster=64] - Per-cluster light-list capacity.
     */
    constructor(maxLights?: number, tileSize?: number, zSlices?: number, maxLightsPerCluster?: number);
    materialLights: any[];
    clusteredLights: any[];
    maxLights: number;
    tileSize: number;
    zSlices: number;
    maxLightsPerCluster: number;
    _chunksPerCluster: number;
    _bufferSize: Vector2 | null;
    _lightIndexes: import("three/webgpu").UniformNode | null;
    _screenClusterIndex: any;
    _compute: any;
    _lightsTexture: DataTexture | null;
    _zSliceRangesTexture: DataTexture | null;
    _zSliceRangesData: Float32Array<ArrayBuffer> | null;
    _lightViewZ: Float32Array<ArrayBuffer>;
    _lightSortOrder: any[];
    _lightsCount: import("three/webgpu").UniformNode;
    _cameraNear: import("three/webgpu").UniformNode;
    _cameraFar: import("three/webgpu").UniformNode;
    _cameraViewMatrix: import("three/webgpu").UniformNode;
    _cameraProjectionMatrix: import("three/webgpu").UniformNode;
    _gridDimensions: import("three/webgpu").UniformNode;
    customCacheKey(): any;
    updateLightsTexture(camera: any): void;
    updateBefore(frame: any): void;
    setLights(lights: any): LightsNode;
    getBlock(): any;
    getTile(element: any): any;
    getClusterLightCount(zSliceNode: any): void;
    getLightData(index: any): {
        position: any;
        viewPosition: any;
        distance: any;
        color: any;
        decay: any;
    };
    setupLights(builder: any, lightNodes: any): void;
    getBufferFitSize(value: any): number;
    setSize(width: any, height: any): this;
    updateProgram(renderer: any): void;
    create(width: any, height: any): void;
}
import { LightsNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
import { DataTexture } from 'three/webgpu';
