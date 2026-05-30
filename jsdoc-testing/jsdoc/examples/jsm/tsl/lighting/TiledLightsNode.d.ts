/**
 * TSL function that checks if a circle intersects with an axis-aligned bounding box (AABB).
 *
 * @tsl
 * @function
 * @param {Node<vec2>} circleCenter - The center of the circle.
 * @param {Node<float>} radius - The radius of the circle.
 * @param {Node<vec2>} minBounds - The minimum bounds of the AABB.
 * @param {Node<vec2>} maxBounds - The maximum bounds of the AABB.
 * @return {Node<bool>} True if the circle intersects the AABB.
 */
export const circleIntersectsAABB: any;
export default TiledLightsNode;
/**
 * TSL function that creates a tiled lights node.
 *
 * @tsl
 * @function
 * @param {number} [maxLights=1024] - The maximum number of lights.
 * @param {number} [tileSize=32] - The tile size.
 * @return {TiledLightsNode} The tiled lights node.
 */
export const tiledLights: any;
/**
 * A custom version of `LightsNode` implementing tiled lighting. This node is used in
 * {@link TiledLighting} to overwrite the renderer's default lighting with
 * a custom implementation.
 *
 * @augments LightsNode
 * @three_import import { tiledLights } from 'three/addons/tsl/lighting/TiledLightsNode.js';
 */
declare class TiledLightsNode extends LightsNode {
    /**
     * Constructs a new tiled lights node.
     *
     * @param {number} [maxLights=1024] - The maximum number of lights.
     * @param {number} [tileSize=32] - The tile size.
     */
    constructor(maxLights?: number, tileSize?: number);
    materialLights: any[];
    tiledLights: any[];
    /**
     * The maximum number of lights.
     *
     * @type {number}
     * @default 1024
     */
    maxLights: number;
    /**
     * The tile size.
     *
     * @type {number}
     * @default 32
     */
    tileSize: number;
    _bufferSize: Vector2 | null;
    _lightIndexes: import("three/webgpu").UniformNode | null;
    _screenTileIndex: any;
    _compute: any;
    _lightsTexture: DataTexture | null;
    _lightsCount: import("three/webgpu").UniformNode;
    _tileLightCount: number;
    _screenSize: import("three/webgpu").UniformNode;
    _cameraProjectionMatrix: import("three/webgpu").UniformNode;
    _cameraViewMatrix: import("three/webgpu").UniformNode;
    customCacheKey(): any;
    updateLightsTexture(): void;
    updateBefore(frame: any): void;
    setLights(lights: any): LightsNode;
    getBlock(block?: number): any;
    getTile(element: any): any;
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
