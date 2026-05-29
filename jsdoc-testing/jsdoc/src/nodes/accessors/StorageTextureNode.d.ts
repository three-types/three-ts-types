export default StorageTextureNode;
/**
 * TSL function for creating a storage texture node.
 *
 * @tsl
 * @function
 * @param {StorageTexture} value - The storage texture.
 * @param {?Node<vec2|vec3>} uvNode - The uv node.
 * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
 * @returns {StorageTextureNode}
 */
export const storageTexture: any;
export function textureStore(value: StorageTexture | StorageTextureNode, uvNode: Node<vec2 | vec3>, storeNode?: Node | null): StorageTextureNode;
/**
 * This special version of a texture node can be used to
 * write data into a storage texture with a compute shader.
 *
 * ```js
 * const storageTexture = new THREE.StorageTexture( width, height );
 *
 * const computeTexture = Fn( ( { storageTexture } ) => {
 *
 * 	const posX = instanceIndex.mod( width );
 * 	const posY = instanceIndex.div( width );
 * 	const indexUV = uvec2( posX, posY );
 *
 * 	// generate RGB values
 *
 * 	const r = 1;
 * 	const g = 1;
 * 	const b = 1;
 *
 * 	textureStore( storageTexture, indexUV, vec4( r, g, b, 1 ) ).toWriteOnly();
 *
 * } );
 *
 * const computeNode = computeTexture( { storageTexture } ).compute( width * height );
 * renderer.computeAsync( computeNode );
 * ```
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments TextureNode
 */
declare class StorageTextureNode extends TextureNode {
    /**
     * Constructs a new storage texture node.
     *
     * @param {StorageTexture} value - The storage texture.
     * @param {Node<vec2|vec3>} uvNode - The uv node.
     * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
     */
    constructor(value: StorageTexture, uvNode: Node<vec2 | vec3>, storeNode?: Node | null);
    /**
     * The value node that should be stored in the texture.
     *
     * @type {?Node}
     * @default null
     */
    storeNode: Node | null;
    /**
     * The mip level to write to for storage textures.
     *
     * @type {number}
     * @default 0
     */
    mipLevel: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTextureNode: boolean;
    /**
     * The access type of the texture node.
     *
     * @type {string}
     * @default 'writeOnly'
     */
    access: string;
    setup(builder: any): any;
    /**
     * Defines the node access.
     *
     * @param {string} value - The node access.
     * @return {StorageTextureNode} A reference to this node.
     */
    setAccess(value: string): StorageTextureNode;
    /**
     * Sets the mip level to write to.
     *
     * @param {number} level - The mip level.
     * @return {StorageTextureNode} A reference to this node.
     */
    setMipLevel(level: number): StorageTextureNode;
    /**
     * Generates the snippet for the storage texture.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} textureProperty - The texture property.
     * @param {string} uvSnippet - The uv snippet.
     * @param {?string} levelSnippet - The level snippet.
     * @param {?string} biasSnippet - The bias snippet.
     * @param {?string} depthSnippet - The depth snippet.
     * @param {?string} compareSnippet - The compare snippet.
     * @param {?Array<string>} gradSnippet - The grad snippet.
     * @param {?string} offsetSnippet - The offset snippet.
     * @return {string} The generated code snippet.
     */
    generateSnippet(builder: NodeBuilder, textureProperty: string, uvSnippet: string, levelSnippet: string | null, biasSnippet: string | null, depthSnippet: string | null, compareSnippet: string | null, gradSnippet: Array<string> | null, offsetSnippet: string | null): string;
    /**
     * Convenience method for configuring a read/write node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toReadWrite(): StorageTextureNode;
    /**
     * Convenience method for configuring a read-only node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toReadOnly(): StorageTextureNode;
    /**
     * Convenience method for configuring a write-only node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toWriteOnly(): StorageTextureNode;
    /**
     * Stores a value in this storage texture at the given coordinates.
     *
     * @param {Node<vec2|vec3>} uvNode - The storage texture coordinates.
     * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
     * @return {StorageTextureNode} A storage texture node representing the store operation.
     */
    store(uvNode: Node<vec2 | vec3>, storeNode?: Node | null): StorageTextureNode;
    /**
     * Generates the code snippet of the storage texture node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    generateStore(builder: NodeBuilder): void;
}
import TextureNode from './TextureNode.js';
