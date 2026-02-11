export default TextureNode;
export function texture(value?: (Texture | TextureNode) | null, uvNode?: Node<vec2 | any> | null, levelNode?: Node<any> | null, biasNode?: Node<float> | null): TextureNode;
export function uniformTexture(value?: Texture | null): TextureNode;
export function textureLoad(...params: any[]): TextureNode;
export function textureLevel(value: any, uv: any, level: any): TextureNode;
export function sampler(value: TextureNode | Texture): Node;
export function samplerComparison(value: TextureNode | Texture): Node;
/**
 * This type of uniform node represents a 2D texture.
 *
 * @augments UniformNode
 */
declare class TextureNode extends UniformNode {
    /**
     * Constructs a new texture node.
     *
     * @param {Texture} [value=EmptyTexture] - The texture.
     * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     * @param {?Node<float>} [biasNode=null] - The bias node.
     */
    constructor(value?: Texture, uvNode?: Node<vec2 | any> | null, levelNode?: Node<any> | null, biasNode?: Node<float> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTextureNode: boolean;
    /**
     * Represents the texture coordinates.
     *
     * @type {?Node<vec2|vec3>}
     * @default null
     */
    uvNode: Node<vec2 | any> | null;
    /**
     * Represents the mip level that should be selected.
     *
     * @type {?Node<int>}
     * @default null
     */
    levelNode: Node<any> | null;
    /**
     * Represents the bias to be applied during level-of-detail computation.
     *
     * @type {?Node<float>}
     * @default null
     */
    biasNode: Node<float> | null;
    /**
     * Represents a reference value a texture sample is compared to.
     *
     * @type {?Node<float>}
     * @default null
     */
    compareNode: Node<float> | null;
    /**
     * When using texture arrays, the depth node defines the layer to select.
     *
     * @type {?Node<int>}
     * @default null
     */
    depthNode: Node<any> | null;
    /**
     * When defined, a texture is sampled using explicit gradients.
     *
     * @type {?Array<Node<vec2>>}
     * @default null
     */
    gradNode: Array<Node<vec2>> | null;
    /**
     * Represents the optional texel offset applied to the unnormalized texture
     * coordinate before sampling the texture.
     *
     * @type {?Node<ivec2|ivec3>}
     * @default null
     */
    offsetNode: Node<ivec2 | ivec3> | null;
    /**
     * Whether texture values should be sampled or fetched.
     *
     * @type {boolean}
     * @default true
     */
    sampler: boolean;
    /**
     * Whether the uv transformation matrix should be
     * automatically updated or not. Use `setUpdateMatrix()`
     * if you want to change the value of the property.
     *
     * @type {boolean}
     * @default false
     */
    updateMatrix: boolean;
    /**
     * The reference node.
     *
     * @type {?Node}
     * @default null
     */
    referenceNode: Node | null;
    /**
     * The texture value is stored in a private property.
     *
     * @private
     * @type {Texture}
     */
    private _value;
    /**
     * The uniform node that represents the uv transformation matrix.
     *
     * @private
     * @type {?UniformNode<mat3>}
     * @default null
     */
    private _matrixUniform;
    /**
     * The uniform node that represents the y-flip. Only required for WebGL.
     *
     * @private
     * @type {?UniformNode<bool>}
     * @default null
     */
    private _flipYUniform;
    set value(value: Texture);
    /**
     * The texture value.
     *
     * @type {Texture}
     */
    get value(): Texture;
    /**
     * Overwritten since the uniform hash is defined by the texture's UUID.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The uniform hash.
     */
    getUniformHash(): string;
    /**
     * Overwritten since the node type is inferred from the texture type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    getNodeType(): string;
    /**
     * Overwrites the default implementation to return a fixed value `'texture'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * Returns a default uvs based on the current texture's channel.
     *
     * @return {AttributeNode<vec2>} The default uvs.
     */
    getDefaultUV(): AttributeNode<vec2>;
    /**
     * Overwritten to always return the texture reference of the node.
     *
     * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
     * @return {Texture} The texture reference.
     */
    updateReference(): Texture;
    /**
     * Transforms the given uv node with the texture transformation matrix.
     *
     * @param {Node} uvNode - The uv node to transform.
     * @return {Node} The transformed uv node.
     */
    getTransformedUV(uvNode: Node): Node;
    /**
     * Defines whether the uv transformation matrix should automatically be updated or not.
     *
     * @param {boolean} value - The update toggle.
     * @return {TextureNode} A reference to this node.
     */
    setUpdateMatrix(value: boolean): TextureNode;
    /**
     * Setups the uv node. Depending on the backend as well as texture's image and type, it might be necessary
     * to modify the uv node for correct sampling.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} uvNode - The uv node to setup.
     * @return {Node} The updated uv node.
     */
    setupUV(builder: NodeBuilder, uvNode: Node): Node;
    /**
     * Setups texture node by preparing the internal nodes for code generation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Generates the uv code snippet.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} uvNode - The uv node to generate code for.
     * @return {string} The generated code snippet.
     */
    generateUV(builder: NodeBuilder, uvNode: Node): string;
    /**
     * Generates the offset code snippet.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} offsetNode - The offset node to generate code for.
     * @return {string} The generated code snippet.
     */
    generateOffset(builder: NodeBuilder, offsetNode: Node): string;
    /**
     * Generates the snippet for the texture sampling.
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
     * Generates the code snippet of the texture node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} output - The current output.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder, output: string): string;
    /**
     * Sets the sampler value.
     *
     * @param {boolean} value - The sampler value to set.
     * @return {TextureNode} A reference to this texture node.
     */
    setSampler(value: boolean): TextureNode;
    /**
     * Returns the sampler value.
     *
     * @return {boolean} The sampler value.
     */
    getSampler(): boolean;
    /**
     * Samples the texture with the given uv node.
     *
     * @param {Node} uvNode - The uv node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    sample(uvNode: Node): TextureNode;
    /**
     * TSL function for creating a texture node that fetches/loads texels without interpolation.
     *
     * @param {Node<uvec2>} uvNode - The uv node.
     * @returns {TextureNode} A texture node representing the texture load.
     */
    load(uvNode: Node<uvec2>): TextureNode;
    /**
     * Samples a blurred version of the texture by defining an internal bias.
     *
     * @param {Node<float>} amountNode - How blurred the texture should be.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    blur(amountNode: Node<float>): TextureNode;
    /**
     * Samples a specific mip of the texture.
     *
     * @param {Node<int>} levelNode - The mip level to sample.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    level(levelNode: Node<any>): TextureNode;
    /**
     * Returns the texture size of the requested level.
     *
     * @param {Node<int>} levelNode - The level to compute the size for.
     * @return {TextureSizeNode} The texture size.
     */
    size(levelNode: Node<any>): TextureSizeNode;
    /**
     * Samples the texture with the given bias.
     *
     * @param {Node<float>} biasNode - The bias node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    bias(biasNode: Node<float>): TextureNode;
    /**
     * Returns the base texture of this node.
     * @return {TextureNode} The base texture node.
     */
    getBase(): TextureNode;
    /**
     * Samples the texture by executing a compare operation.
     *
     * @param {Node<float>} compareNode - The node that defines the compare value.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    compare(compareNode: Node<float>): TextureNode;
    /**
     * Samples the texture using an explicit gradient.
     *
     * @param {Node<vec2>} gradNodeX - The gradX node.
     * @param {Node<vec2>} gradNodeY - The gradY node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    grad(gradNodeX: Node<vec2>, gradNodeY: Node<vec2>): TextureNode;
    /**
     * Samples the texture by defining a depth node.
     *
     * @param {Node<int>} depthNode - The depth node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    depth(depthNode: Node<any>): TextureNode;
    /**
     * Samples the texture by defining an offset node.
     *
     * @param {Node<ivec2>} offsetNode - The offset node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    offset(offsetNode: Node<ivec2>): TextureNode;
    /**
     * The update is used to implement the update of the uv transformation matrix.
     */
    update(): void;
    /**
     * Clones the texture node.
     *
     * @return {TextureNode} The cloned texture node.
     */
    clone(): TextureNode;
}
import { Texture } from '../../textures/Texture.js';
import UniformNode from '../core/UniformNode.js';
