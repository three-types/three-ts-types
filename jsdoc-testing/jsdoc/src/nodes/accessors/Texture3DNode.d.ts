export default Texture3DNode;
/**
 * TSL function for creating a 3D texture node.
 *
 * @tsl
 * @function
 * @param {Data3DTexture} value - The 3D texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @returns {Texture3DNode}
 */
export const texture3D: any;
export function texture3DLoad(...params: any[]): Texture3DNode;
export function texture3DLevel(value: Data3DTexture, uvNode: Node<any>, levelNode: Node<int>): Texture3DNode;
/**
 * This type of uniform node represents a 3D texture.
 *
 * @augments TextureNode
 */
declare class Texture3DNode extends TextureNode {
    /**
     * Constructs a new 3D texture node.
     *
     * @param {Data3DTexture} value - The 3D texture.
     * @param {?Node<vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     */
    constructor(value: Data3DTexture, uvNode?: Node<any> | null, levelNode?: Node<int> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTexture3DNode: boolean;
    /**
     * Computes the normal for the given uv. These texture coordiantes represent a
     * position inside the 3D texture. Unlike geometric normals, this normal
     * represents a slope or gradient of scalar data inside the 3D texture.
     *
     * @param {Node<vec3>} uvNode - The uv node that defines a position in the 3D texture.
     * @return {Node<vec3>} The normal representing the slope/gradient in the data.
     */
    normal(uvNode: Node<any>): Node<any>;
}
import TextureNode from './TextureNode.js';
