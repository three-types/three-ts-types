/**
 * Helper class to manage and display debug visuals for TileShadowNode.
 *
 * @augments Group
 * @three_import import { TileShadowNodeHelper } from 'three/addons/tsl/shadows/TileShadowNodeHelper.js';
 */
export class TileShadowNodeHelper extends Group {
    /**
     * @param {TileShadowNode} tileShadowNode The TileShadowNode instance to debug.
     */
    constructor(tileShadowNode: TileShadowNode);
    tileShadowNode: any;
    config: any;
    tiles: any;
    _debugMeshes: any[];
    _shadowCamHelpers: any[];
    initialized: boolean;
    /**
     * Initializes the debug displays (planes and camera helpers).
     * Should be called after TileShadowNode has initialized its lights and shadow nodes.
     */
    init(): void;
    /**
     * Updates the debug visuals (specifically camera helpers).
     * Should be called within TileShadowNode's update method.
     */
    update(): void;
    /**
     * Removes all debug objects (planes and helpers) from the scene.
     */
    dispose(): void;
}
import { Group } from 'three/webgpu';
