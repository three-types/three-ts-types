export default MatcapUVNode;
/**
 * TSL function for creating a matcap uv node.
 *
 * @tsl
 * @function
 * @returns {MatcapUVNode}
 */
export const matcapUV: any;
/**
 * Can be used to compute texture coordinates for projecting a
 * matcap onto a mesh. Used by {@link MeshMatcapNodeMaterial}.
 *
 * @augments TempNode
 */
declare class MatcapUVNode extends TempNode {
    /**
     * Constructs a new matcap uv node.
     */
    constructor();
    setup(): any;
}
import TempNode from '../core/TempNode.js';
