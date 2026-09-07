/**
 * Module for representing sun lights as nodes. Register it with the
 * renderer's node library to use {@link SunLight} with `WebGPURenderer`:
 * ```js
 * renderer.library.addLight( SunLightNode, SunLight );
 * ```
 *
 * @augments AnalyticLightNode
 * @three_import import { SunLightNode } from 'three/addons/lights/SunLightNode.js';
 */
export class SunLightNode extends AnalyticLightNode {
    /**
     * Overwritten to setup the cascaded shadows of sun lights.
     *
     * @return {SunShadowNode} The created shadow node.
     */
    setupShadowNode(): SunShadowNode;
    setupDirect(): {
        lightDirection: any;
        lightColor: import("three/webgpu").Node;
    };
}
import { AnalyticLightNode } from 'three/webgpu';
