export default CubeTextureNode;
/**
 * TSL function for creating a cube texture node.
 *
 * @tsl
 * @function
 * @param {CubeTexture} value - The cube texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {CubeTextureNode}
 */
export const cubeTextureBase: any;
export function cubeTexture(value?: (CubeTexture | CubeTextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<int> | null, biasNode?: Node<float> | null): CubeTextureNode;
export function uniformCubeTexture(value?: CubeTexture | null): CubeTextureNode;
/**
 * This type of uniform node represents a cube texture.
 *
 * @augments TextureNode
 */
declare class CubeTextureNode extends TextureNode {
    /**
     * Constructs a new cube texture node.
     *
     * @param {CubeTexture} value - The cube texture.
     * @param {?Node<vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     * @param {?Node<float>} [biasNode=null] - The bias node.
     */
    constructor(value: CubeTexture, uvNode?: Node<any> | null, levelNode?: Node<int> | null, biasNode?: Node<float> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTextureNode: boolean;
    /**
     * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
     * for cube textures. The uv transformation matrix is not applied to cube textures.
     *
     * @param {boolean} value - The update toggle.
     */
    setUpdateMatrix(): void;
}
import { CubeTexture } from '../../textures/CubeTexture.js';
import TextureNode from './TextureNode.js';
