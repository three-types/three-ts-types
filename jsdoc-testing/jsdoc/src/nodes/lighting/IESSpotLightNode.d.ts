export default IESSpotLightNode;
/**
 * An IES version of the default spot light node.
 *
 * @augments SpotLightNode
 */
declare class IESSpotLightNode extends SpotLightNode {
    /**
     * The texture node representing the IES texture.
     *
     * @type {?TextureNode}
     * @default null
     */
    _iesTextureNode: TextureNode | null;
}
import SpotLightNode from './SpotLightNode.js';
