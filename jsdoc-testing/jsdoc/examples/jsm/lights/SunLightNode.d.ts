/**
 * Module for representing sun lights as nodes. Register it with {@link SunLight}
 * to use the light with `WebGPURenderer`:
 * ```js
 * SunLight.registerNode( SunLightNode );
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
        lightColor: import("three/tsl").Node;
    };
}
import { AnalyticLightNode } from 'three/webgpu';
