export default RendererReferenceNode;
export function rendererReference(name: string, type: string, renderer?: Renderer | null): RendererReferenceNode;
/**
 * This node is a special type of reference node which is intended
 * for linking renderer properties with node values.
 * ```js
 * const exposureNode = rendererReference( 'toneMappingExposure', 'float', renderer );
 * ```
 * When changing `renderer.toneMappingExposure`, the node value of `exposureNode` will
 * automatically be updated.
 *
 * @augments ReferenceBaseNode
 */
declare class RendererReferenceNode extends ReferenceBaseNode {
    /**
     * Constructs a new renderer reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} inputType - The uniform type that should be used to represent the property value.
     * @param {?Renderer} [renderer=null] - The renderer the property belongs to. When no renderer is set,
     * the node refers to the renderer of the current state.
     */
    constructor(property: string, inputType: string, renderer?: Renderer | null);
    /**
     * The renderer the property belongs to. When no renderer is set,
     * the node refers to the renderer of the current state.
     *
     * @type {?Renderer}
     * @default null
     */
    renderer: Renderer | null;
}
import ReferenceBaseNode from './ReferenceBaseNode.js';
