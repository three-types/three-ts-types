/**
 * A class that extends `ShadowBaseNode` to implement tiled shadow mapping.
 * This allows splitting a shadow map into multiple tiles, each with its own light and camera,
 * to improve shadow quality and performance for large scenes.
 *
 * **Note:** This class does not support `VSMShadowMap` at the moment.
 *
 * @class
 * @augments ShadowBaseNode
 * @three_import import { TileShadowNode } from 'three/addons/tsl/shadows/TileShadowNode.js';
 */
export class TileShadowNode extends ShadowBaseNode {
    /**
     * Creates an instance of `TileShadowNode`.
     *
     * @param {Light} light - The original light source used for shadow mapping.
     * @param {Object} [options={}] - Configuration options for the tiled shadow node.
     * @param {number} [options.tilesX=2] - The number of tiles along the X-axis.
     * @param {number} [options.tilesY=2] - The number of tiles along the Y-axis.
     * @param {Object} [options.resolution] - The resolution of the shadow map.
     * @param {boolean} [options.debug=false] - Whether to enable debug mode.
     */
    constructor(light: Light, options?: {
        tilesX?: number | undefined;
        tilesY?: number | undefined;
        resolution?: Object | undefined;
        debug?: boolean | undefined;
    });
    config: {
        tilesX: number;
        tilesY: number;
        resolution: any;
        debug: boolean;
    };
    debug: boolean;
    originalLight: Light;
    lightPlane: Plane;
    line: Line3;
    initialLightDirection: Vector3;
    _cameraFrameId: WeakMap<object, any>;
    shadowSize: {
        top: any;
        bottom: any;
        left: any;
        right: any;
    };
    lights: any[];
    _shadowNodes: any[];
    tiles: Object[];
    /**
     * Generates the tiles for the shadow map based on the specified number of tiles along the X and Y axes.
     *
     * @param {number} tilesX - The number of tiles along the X-axis.
     * @param {number} tilesY - The number of tiles along the Y-axis.
     * @returns {Array<Object>} An array of tile objects, each containing the tile's bounds and index.
     */
    generateTiles(tilesX: number, tilesY: number): Array<Object>;
    /**
     * Updates the initial light direction based on the light's target position.
     */
    updateLightDirection(): void;
    /**
     * Initializes the tiled shadow node by creating lights, cameras, and shadow maps for each tile.
     *
     * @param {Builder} builder - The builder used to create render targets and other resources.
     */
    init(builder: Builder): void;
    shadowMap: any;
    cameraArray: ArrayCamera | undefined;
    /**
     * Updates the light transformations and shadow cameras for each tile.
     */
    update(): void;
    /**
     * Updates the shadow map rendering.
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateShadow(frame: NodeFrame): void;
    _depthVersionCached: any;
    /**
     * The implementation performs the update of the shadow map if necessary.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * Synchronizes the transformation of a tile light with the source light.
     *
     * @param {LwLight} lwLight - The tile light to synchronize.
     * @param {Light} sourceLight - The source light to copy transformations from.
     */
    syncLightTransformation(lwLight: LwLight, sourceLight: Light): void;
    /**
     * Sets up the shadow node for rendering.
     *
     * @param {Builder} builder - The builder used to set up the shadow node.
     * @returns {Node} A node representing the shadow value.
     */
    setup(builder: Builder): Node;
    /**
     * Helper method to remove lights and associated nodes/targets.
     * Used internally during dispose and potential re-initialization.
     */
    disposeLightsAndNodes(): void;
}
import { ShadowBaseNode } from 'three/webgpu';
import { Plane } from 'three/webgpu';
import { Line3 } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
import { ArrayCamera } from 'three/webgpu';
declare class LwLight extends Object3D {
    target: Object3D;
}
import { Object3D } from 'three/webgpu';
export {};
