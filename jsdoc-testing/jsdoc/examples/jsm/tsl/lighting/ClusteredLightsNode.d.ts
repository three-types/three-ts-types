export default ClusteredLightsNode;
/**
 * TSL function that creates a clustered lights node.
 *
 * @tsl
 * @function
 * @param {number} [maxLights=1024] - Maximum number of point and spot lights.
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
 * only the point and spot lights whose bounding spheres intersect it. At shading time each fragment
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
     * @param {number} [maxLights=1024] - Maximum number of point and spot lights.
     * @param {number} [tileSize=32] - Screen tile size in pixels (cluster XY size).
     * @param {number} [zSlices=24] - Number of exponential depth slices.
     * @param {number} [maxLightsPerCluster=64] - Per-cluster light-list capacity.
     */
    constructor(maxLights?: number, tileSize?: number, zSlices?: number, maxLightsPerCluster?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isClusteredLightsNode: boolean;
    materialLights: any[];
    clusteredLights: any[];
    maxLights: number;
    tileSize: number;
    zSlices: number;
    maxLightsPerCluster: number;
    _chunksPerCluster: number;
    _bufferSize: Vector2 | null;
    _isWebGLBackend: boolean;
    _needsRebuild: boolean;
    _invocationsPerCluster: number;
    _lightIndexes: any;
    _renderer: any;
    _screenClusterIndex: any;
    _compute: any;
    _lightsTexture: DataTexture;
    _zSliceRangesData: Float32Array<ArrayBuffer>;
    _zSliceRangesTexture: DataTexture;
    _lightViewZ: Float32Array<ArrayBuffer>;
    _lightSortOrder: any[];
    _lightsCount: import("three/tsl").UniformNode;
    _cameraNear: import("three/tsl").UniformNode;
    _cameraFar: import("three/tsl").UniformNode;
    _cameraViewMatrix: import("three/tsl").UniformNode;
    _cameraProjectionMatrix: import("three/tsl").UniformNode;
    _gridDimensions: import("three/tsl").UniformNode;
    /**
     * Updates the light data and the light ranges of the depth slices.
     *
     * @private
     * @param {Camera} camera - The camera.
     */
    private _updateLightsTexture;
    /**
     * Returns the normalized world-space direction pointing from the spot light's
     * target to the spot light.
     *
     * @private
     * @param {SpotLight} light - The spot light.
     * @param {Vector3} target - The target vector.
     * @return {Vector3} The direction.
     */
    private _getSpotDirection;
    /**
     * Returns the world-space center of the light's bounding sphere. For spot lights,
     * this is the center of the smallest sphere enclosing the cone.
     *
     * @private
     * @param {PointLight|SpotLight} light - The light.
     * @param {Vector3} target - The target vector.
     * @return {Vector3} The bounding sphere center.
     */
    private _getBoundingSphereCenter;
    /**
     * Returns the radius of the light's bounding sphere.
     *
     * @private
     * @param {PointLight|SpotLight} light - The light.
     * @return {number} The bounding sphere radius. `-1` if the light has no cutoff distance.
     */
    private _getBoundingSphereRadius;
    /**
     * Updates the light data and assigns the lights to the clusters.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * Configures this node with an array of lights. Point and spot lights without
     * shadows are clustered (except lights with a `colorNode`, spot lights with a
     * projected `map` and light types with their own light node, like `IESSpotLight`
     * or `ProjectorLight`), all other lights use the default lighting.
     *
     * @param {Array<Light>} lights - An array of lights.
     * @return {ClusteredLightsNode} A reference to this node.
     */
    setLights(lights: Array<Light>): ClusteredLightsNode;
    /**
     * Returns `true` if the given light can be clustered.
     *
     * @private
     * @param {Light} light - The light.
     * @return {boolean} Whether the light is clustered or not.
     */
    private _isClusteredLight;
    /**
     * Returns the light index stored at the given slot of the fragment's cluster.
     *
     * @private
     * @param {number|Node<int>} element - The slot.
     * @return {Node<int>} The 1-based light index. `0` marks the end of the list.
     */
    private _getTile;
    /**
     * Returns the number of lights in the fragment's cluster. Useful for debugging.
     *
     * @param {Node<int>} zSliceNode - The depth slice to inspect. A negative value selects the fragment's own cluster.
     * @return {Node<int>} The light count.
     */
    getClusterLightCount(zSliceNode: Node<any>): Node<any>;
    /**
     * Returns the shading data of the light at the given index.
     *
     * @private
     * @param {number|Node<int>} index - The light index.
     * @return {Object} The light's view position, distance, color, decay, view-space spot direction and spot offset.
     */
    private _getLightData;
    /**
     * Returns the culling data of the light at the given index.
     *
     * @private
     * @param {number|Node<int>} index - The light index.
     * @return {Object} The view-space center and the radius of the light's bounding sphere. A negative radius marks an unbounded light.
     */
    private _getLightBounds;
    /**
     * Sets up the default lights and the clustered point and spot lights.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Array<LightingNode>} lightNodes - An array of lighting nodes.
     */
    setupLights(builder: NodeBuilder, lightNodes: Array<LightingNode>): void;
    /**
     * Rounds the given size up to a multiple of the tile size.
     *
     * @private
     * @param {number} value - The size.
     * @return {number} The fitted size.
     */
    private _getBufferFitSize;
    /**
     * Sets the size of the cluster grid. Must be called outside of rendering. Not required
     * with {@link ClusteredLighting}, which fits the grid at the beginning of each render.
     *
     * @param {number} width - The drawing buffer width.
     * @param {number} height - The drawing buffer height.
     * @return {ClusteredLightsNode} A reference to this node.
     */
    setSize(width: number, height: number): ClusteredLightsNode;
    /**
     * Fits the cluster grid to the framebuffer of the render that is about to start. Called by
     * {@link ClusteredLighting} before the render objects of the render are prepared. Since each
     * render depth has its own node, no pending command buffer uses the resources of this node at
     * this point, so a rebuild can free the replaced resources immediately.
     */
    updateSize(): void;
    /**
     * Creates the cluster grid on first use. While rendering, the grid is never rebuilt: the
     * replaced resources could still be used by a command buffer that was not submitted yet.
     *
     * @private
     * @param {Renderer} renderer - The renderer.
     */
    private _initGrid;
    /**
     * Fits the cluster grid to the framebuffer the renderer is rendering to.
     *
     * @private
     * @param {Renderer} renderer - The renderer.
     */
    private _fitToRenderer;
    /**
     * Resizes the cluster grid. The grid dimensions are uniforms, so resizing only updates
     * them and the compute count; the compute and the storage are rebuilt only when the
     * storage has to grow (or the backend changed).
     *
     * @private
     * @param {number} width - The fitted width.
     * @param {number} height - The fitted height.
     */
    private _resize;
    /**
     * Creates the light index storage, the compute node and the fragment cluster lookup.
     * The storage is allocated with headroom so that most resizes do not need a rebuild.
     *
     * @private
     * @param {number} clusterCount - The number of clusters of the current grid.
     */
    private _create;
}
import { LightsNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
import { DataTexture } from 'three/webgpu';
