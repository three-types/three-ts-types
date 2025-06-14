export default EquirectUVNode;
/**
 * TSL function for creating an equirect uv node.
 *
 * @tsl
 * @function
 * @param {?Node<vec3>} [dirNode=positionWorldDirection] - A direction vector for sampling which is by default `positionWorldDirection`.
 * @returns {EquirectUVNode}
 */
export const equirectUV: any;
/**
 * Can be used to compute texture coordinates for projecting an
 * equirectangular texture onto a mesh for using it as the scene's
 * background.
 *
 * ```js
 * scene.backgroundNode = texture( equirectTexture, equirectUV() );
 * ```
 *
 * @augments TempNode
 */
declare class EquirectUVNode extends TempNode {
    /**
     * Constructs a new equirect uv node.
     *
     * @param {Node<vec3>} [dirNode=positionWorldDirection] - A direction vector for sampling which is by default `positionWorldDirection`.
     */
    constructor(dirNode?: Node<vec3>);
    /**
     * A direction vector for sampling why is by default `positionWorldDirection`.
     *
     * @type {Node<vec3>}
     */
    dirNode: Node<vec3>;
    setup(): any;
}
import TempNode from '../core/TempNode.js';
