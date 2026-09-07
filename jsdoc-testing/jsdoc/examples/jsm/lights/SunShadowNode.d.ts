export function sunShadow(light: SunLight, shadow?: SunLightShadow | null): SunShadowNode;
/**
 * Represents the cascaded shadow map of a {@link SunLight}.
 *
 * The two cascade cameras are fitted by {@link SunLightShadow} and rendered
 * into the viewports of a single shadow map atlas. Each fragment walks the
 * cascades back to front, blending across the fade bands between them.
 *
 * @augments ShadowNode
 * @three_import import { sunShadow } from 'three/addons/lights/SunShadowNode.js';
 */
export class SunShadowNode extends ShadowNode {
    /**
     * The size of the shadow map atlas.
     *
     * @type {Vector2}
     * @private
     */
    private _atlasSize;
    /**
     * Shadow filters read their texel offsets from `mapSize`, so they must
     * be given the atlas size rather than the cascade map size. This proxy
     * stands in for the shadow when the filter function is set up.
     *
     * @type {Object}
     * @private
     */
    private _filterShadow;
    /**
     * Overwrites the default implementation to size the render target as the cascade atlas.
     *
     * @param {SunLightShadow} shadow - The light shadow object.
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Object} An object containing the shadow map and depth texture.
     */
    setupRenderTarget(shadow: SunLightShadow, builder: NodeBuilder): Object;
    /**
     * Builds the per-fragment cascade blending.
     *
     * @private
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Function} filterFn - The shadow filtering function.
     * @return {Node<float>} The shadow value node.
     */
    private _setupCascades;
    /**
     * Sets up the atlas render target and shadow output node.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<float>} The shadow output node.
     */
    setupShadow(builder: NodeBuilder): Node<any>;
    /**
     * Renders the two cascades into the viewports of the shadow map atlas.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    renderShadow(frame: NodeFrame): void;
    /**
     * Overwritten as a no-op since VSM is not supported for cascaded shadow maps.
     *
     * @param {Renderer} renderer - A reference to the current renderer.
     */
    vsmPass(): void;
}
import { ShadowNode } from 'three/webgpu';
