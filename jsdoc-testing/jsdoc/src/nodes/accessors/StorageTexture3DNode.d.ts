export default StorageTexture3DNode;
/**
 * TSL function for creating a 3D storage texture node.
 *
 * @tsl
 * @function
 * @param {Storage3DTexture} value - The 3D storage texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
 * @returns {StorageTexture3DNode}
 */
export const storageTexture3D: any;
/**
 * This special version of a texture node can be used to
 * write data into a 3D storage texture with a compute shader.
 *
 * @augments StorageTextureNode
 */
declare class StorageTexture3DNode extends StorageTextureNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture3DNode: boolean;
    /**
     * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
     * for 3D textures. The uv transformation matrix is not applied to 3D textures.
     *
     * @param {boolean} value - The update toggle.
     */
    setUpdateMatrix(): void;
}
import StorageTextureNode from './StorageTextureNode.js';
