export default GLSLNodeBuilder;
/**
 * A node builder targeting GLSL.
 *
 * This module generates GLSL shader code from node materials and also
 * generates the respective bindings and vertex buffer definitions. These
 * data are later used by the renderer to create render and compute pipelines
 * for render objects.
 *
 * @augments NodeBuilder
 */
declare class GLSLNodeBuilder extends NodeBuilder {
    /**
     * Constructs a new GLSL node builder renderer.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Renderer} renderer - The renderer.
     */
    constructor(object: Object3D, renderer: Renderer);
    /**
     * A dictionary holds for each shader stage ('vertex', 'fragment', 'compute')
     * another dictionary which manages UBOs per group ('render','frame','object').
     *
     * @type {Object<string,Object<string,NodeUniformsGroup>>}
     */
    uniformGroups: {
        [x: string]: {
            [x: string]: NodeUniformsGroup;
        };
    };
    /**
     * An array that holds objects defining the varying and attribute data in
     * context of Transform Feedback.
     *
     * @type {Array<Object<string,AttributeNode|string>>}
     */
    transforms: Array<{
        [x: string]: AttributeNode | string;
    }>;
    /**
     * A dictionary that holds for each shader stage a Map of used extensions.
     *
     * @type {Object<string,Map<string,Object>>}
     */
    extensions: {
        [x: string]: Map<string, Object>;
    };
    /**
     * A dictionary that holds for each shader stage an Array of used builtins.
     *
     * @type {Object<string,Array<string>>}
     */
    builtins: {
        [x: string]: string[];
    };
    /**
     * Checks if the given texture requires a manual conversion to the working color space.
     *
     * @param {Texture} texture - The texture to check.
     * @return {boolean} Whether the given texture requires a conversion to working color space or not.
     */
    needsToWorkingColorSpace(texture: Texture): boolean;
    /**
     * Includes the given method name into the current
     * function node.
     *
     * @private
     * @param {string} name - The method name to include.
     * @return {CodeNode} The respective code node.
     */
    private _include;
    /**
     * Returns the bitcast method name for a given input and outputType.
     *
     * @param {string} type - The output type to bitcast to.
     * @param {string} inputType - The input type of the.
     * @return {string} The resolved WGSL bitcast invocation.
     */
    getBitcastMethod(type: string, inputType: string): string;
    /**
     * Returns the float packing method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @returns {string} The resolved GLSL float packing method name.
     */
    getFloatPackingMethod(encoding: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @returns {string} The resolved GLSL float unpacking method name.
     */
    getFloatUnpackingMethod(encoding: string): string;
    /**
     * Returns the native snippet for a ternary operation.
     *
     * @param {string} condSnippet - The condition determining which expression gets resolved.
     * @param {string} ifSnippet - The expression to resolve to if the condition is true.
     * @param {string} elseSnippet - The expression to resolve to if the condition is false.
     * @return {string} The resolved method name.
     */
    getTernary(condSnippet: string, ifSnippet: string, elseSnippet: string): string;
    /**
     * Builds the given shader node.
     *
     * @param {ShaderNodeInternal} shaderNode - The shader node.
     * @return {string} The GLSL function code.
     */
    buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    /**
     * Setups the Pixel Buffer Object (PBO) for the given storage
     * buffer node.
     *
     * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
     */
    setupPBO(storageBufferNode: StorageBufferNode): void;
    /**
     * Returns a GLSL snippet that represents the property name of the given node.
     *
     * @param {Node} node - The node.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getPropertyName(node: Node, shaderStage?: string): string;
    /**
     * Setups the Pixel Buffer Object (PBO) for the given storage
     * buffer node.
     *
     * @param {StorageArrayElementNode} storageArrayElementNode - The storage array element node.
     * @return {string} The property name.
     */
    generatePBO(storageArrayElementNode: StorageArrayElementNode): string;
    /**
     * Generates the GLSL snippet that reads a single texel from a texture without sampling or filtering.
     *
     * @param {?Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {?string} levelSnippet - A GLSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A GLSL snippet that represents the 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureLoad(texture: Texture | null, textureProperty: string, uvIndexSnippet: string, levelSnippet: string | null, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling/loading the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet -  A GLSL snippet that represents the 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTexture(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet when sampling textures with explicit mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A GLSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureLevel(texture: Texture, textureProperty: string, uvSnippet: string, levelSnippet: string, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet when sampling textures with a bias to the mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} biasSnippet - A GLSL snippet that represents the bias to apply to the mip level before sampling.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureBias(texture: Texture, textureProperty: string, uvSnippet: string, biasSnippet: string, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling/loading the given texture using explicit gradients.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {Array<string>} gradSnippet - An array holding both gradient GLSL snippets.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureGrad(texture: Texture, textureProperty: string, uvSnippet: string, gradSnippet: Array<string>, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling a depth texture and comparing the sampled depth values
     * against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet -  A GLSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The GLSL snippet.
     */
    generateTextureCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Returns the variables of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the variables.
     */
    getVars(shaderStage: string): string;
    /**
     * Returns the uniforms of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the uniforms.
     */
    getUniforms(shaderStage: string): string;
    /**
     * Returns the shader attributes of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the shader attributes.
     */
    getAttributes(shaderStage: string): string;
    /**
     * Returns the members of the given struct type node as a GLSL string.
     *
     * @param {StructTypeNode} struct - The struct type node.
     * @return {string} The GLSL snippet that defines the struct members.
     */
    getStructMembers(struct: StructTypeNode): string;
    /**
     * Returns the structs of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the structs.
     */
    getStructs(shaderStage: string): string;
    /**
     * Returns the varyings of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the varyings.
     */
    getVaryings(shaderStage: string): string;
    /**
     * Returns a builtin representing the index of an invocation within its workgroup.
     *
     * @return {string} The invocation local index.
     */
    getInvocationLocalIndex(): string;
    /**
     * Returns a builtin representing the size of a subgroup within the current shader.
     */
    getSubgroupSize(): void;
    /**
     * Returns a builtin representing the index of an invocation within its subgroup.
     */
    getInvocationSubgroupIndex(): void;
    /**
     * Returns a builtin representing the index of the current invocation's subgroup within its workgroup.
     */
    getSubgroupIndex(): void;
    /**
     * Returns the frag depth builtin.
     *
     * @return {string} The frag depth builtin.
     */
    getFragDepth(): string;
    /**
     * Enables the given extension.
     *
     * @param {string} name - The extension name.
     * @param {string} behavior - The extension behavior.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage.
     */
    enableExtension(name: string, behavior: string, shaderStage?: string): void;
    /**
     * Returns the enabled extensions of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the enabled extensions.
     */
    getExtensions(shaderStage: string): string;
    /**
     * Returns the clip distances builtin.
     *
     * @return {string} The clip distances builtin.
     */
    getClipDistance(): string;
    /**
     * Whether the requested feature is available or not.
     *
     * @param {string} name - The requested feature.
     * @return {boolean} Whether the requested feature is supported or not.
     */
    isAvailable(name: string): boolean;
    /**
     * Enables hardware clipping.
     *
     * @param {string} planeCount - The clipping plane count.
     */
    enableHardwareClipping(planeCount: string): void;
    /**
     * Enables multiview.
     */
    enableMultiview(): void;
    /**
     * Registers a transform in context of Transform Feedback.
     *
     * @param {string} varyingName - The varying name.
     * @param {AttributeNode} attributeNode - The attribute node.
     */
    registerTransform(varyingName: string, attributeNode: AttributeNode): void;
    /**
     * Returns the transforms of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the transforms.
     */
    getTransforms(): string;
    /**
     * Returns a GLSL struct based on the given name and variables.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @return {string} The GLSL snippet representing a struct.
     */
    private _getGLSLUniformStruct;
    /**
     * Returns a GLSL vertex shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getGLSLVertexCode;
    /**
     * Returns a GLSL fragment shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getGLSLFragmentCode;
    /**
     * This method is one of the more important ones since it's responsible
     * for generating a matching binding instance for the given uniform node.
     *
     * These bindings are later used in the renderer to create bind groups
     * and layouts.
     *
     * @param {UniformNode} node - The uniform node.
     * @param {string} type - The node data type.
     * @param {string} shaderStage - The shader stage.
     * @param {?string} [name=null] - An optional uniform name.
     * @return {NodeUniform} The node uniform object.
     */
    getUniformFromNode(node: UniformNode, type: string, shaderStage: string, name?: string | null): NodeUniform;
}
import { NodeBuilder } from '../../../nodes/Nodes.js';
import NodeUniformsGroup from '../../common/nodes/NodeUniformsGroup.js';
