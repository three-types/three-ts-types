export default WGSLNodeBuilder;
/**
 * A node builder targeting WGSL.
 *
 * This module generates WGSL shader code from node materials and also
 * generates the respective bindings and vertex buffer definitions. These
 * data are later used by the renderer to create render and compute pipelines
 * for render objects.
 *
 * @augments NodeBuilder
 */
declare class WGSLNodeBuilder extends NodeBuilder {
    /**
     * Constructs a new WGSL node builder renderer.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Renderer} renderer - The renderer.
     */
    constructor(object: Object3D, renderer: Renderer);
    /**
     * A dictionary that holds for each shader stage ('vertex', 'fragment', 'compute')
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
     * A dictionary that holds the assigned binding indices for each uniform group.
     * This ensures the same binding index is used across all shader stages.
     *
     * @type {Object<string,{index: number, id: number}>}
     */
    uniformGroupsBindings: {
        [x: string]: {
            index: number;
            id: number;
        };
    };
    /**
     * A dictionary that holds for each shader stage a Map of builtins.
     *
     * @type {Object<string,Map<string,Object>>}
     */
    builtins: {
        [x: string]: Map<string, Object>;
    };
    /**
     * A dictionary that holds for each shader stage a Set of directives.
     *
     * @type {Object<string,Set<string>>}
     */
    directives: {
        [x: string]: Set<string>;
    };
    /**
     * A map for managing scope arrays. Only relevant for when using
     * {@link WorkgroupInfoNode} in context of compute shaders.
     *
     * @type {Map<string,Object>}
     */
    scopedArrays: Map<string, Object>;
    /**
     * Generates the WGSL snippet for sampled textures.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    private _generateTextureSample;
    /**
     * Generates the WGSL snippet when sampling textures with explicit mip level.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    private generateTextureSampleLevel;
    /**
     * Generates a wrap function used in context of textures.
     *
     * @param {Texture} texture - The texture to generate the function for.
     * @return {string} The name of the generated function.
     */
    generateWrapFunction(texture: Texture): string;
    /**
     * Generates a WGSL variable that holds the texture dimension of the given texture.
     * It also returns information about the number of layers (elements) of an arrayed
     * texture as well as the cube face count of cube textures.
     *
     * @param {Texture} texture - The texture to generate the function for.
     * @param {string} textureProperty - The name of the video texture uniform in the shader.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @return {string} The name of the dimension variable.
     */
    generateTextureDimension(texture: Texture, textureProperty: string, levelSnippet: string): string;
    /**
     * Generates the WGSL snippet for a manual filtered texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [levelSnippet='0u'] - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @return {string} The WGSL snippet.
     */
    generateFilteredTexture(texture: Texture, textureProperty: string, uvSnippet: string, offsetSnippet: string | null, levelSnippet?: string): string;
    /**
     * Generates the WGSL snippet for a texture lookup with explicit level-of-detail.
     * Since it's a lookup, no sampling or filtering is applied.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [levelSnippet='0u'] - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureLod(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, levelSnippet?: string): string;
    /**
     * Generates the WGSL snippet that reads a single texel from a texture without sampling or filtering.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureLoad(texture: Texture, textureProperty: string, uvIndexSnippet: string, levelSnippet: string | null, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet that writes a single texel to a texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {string} valueSnippet - A WGSL snippet that represent the new texel value.
     * @return {string} The WGSL snippet.
     */
    generateTextureStore(texture: Texture, textureProperty: string, uvIndexSnippet: string, depthSnippet: string | null, valueSnippet: string): string;
    /**
     * Returns `true` if the sampled values of the given texture should be compared against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @return {boolean} Whether the sampled values of the given texture should be compared against a reference value or not.
     */
    isSampleCompare(texture: Texture): boolean;
    /**
     * Returns `true` if the given texture is unfilterable.
     *
     * @param {Texture} texture - The texture.
     * @return {boolean} Whether the given texture is unfilterable or not.
     */
    isUnfilterable(texture: Texture): boolean;
    /**
     * Generates the WGSL snippet for sampling/loading the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTexture(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet for sampling/loading the given texture using explicit gradients.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {Array<string>} gradSnippet - An array holding both gradient WGSL snippets.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureGrad(texture: Texture, textureProperty: string, uvSnippet: string, gradSnippet: Array<string>, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet for sampling a depth texture and comparing the sampled depth values
     * against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet -  A WGSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet when sampling textures with explicit mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureLevel(texture: Texture, textureProperty: string, uvSnippet: string, levelSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet when sampling textures with a bias to the mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} biasSnippet - A WGSL snippet that represents the bias to apply to the mip level before sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureBias(texture: Texture, textureProperty: string, uvSnippet: string, biasSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Returns a WGSL snippet that represents the property name of the given node.
     *
     * @param {Node} node - The node.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getPropertyName(node: Node, shaderStage?: string): string;
    /**
     * Returns the native shader operator name for a given generic name.
     *
     * @param {string} op - The operator name to resolve.
     * @return {?string} The resolved operator name.
     */
    getFunctionOperator(op: string): string | null;
    /**
     * Returns the node access for the given node and shader stage.
     *
     * @param {StorageTextureNode|StorageBufferNode} node - The storage node.
     * @param {string} shaderStage - The shader stage.
     * @return {string} The node access.
     */
    getNodeAccess(node: StorageTextureNode | StorageBufferNode, shaderStage: string): string;
    /**
     * Returns A WGSL snippet representing the storage access.
     *
     * @param {StorageTextureNode|StorageBufferNode} node - The storage node.
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet representing the storage access.
     */
    getStorageAccess(node: StorageTextureNode | StorageBufferNode, shaderStage: string): string;
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
    /**
     * This method should be used whenever builtins are required in nodes.
     * The internal builtins data structure will make sure builtins are
     * defined in the WGSL source.
     *
     * @param {string} name - The builtin name.
     * @param {string} property - The property name.
     * @param {string} type - The node data type.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getBuiltin(name: string, property: string, type: string, shaderStage?: string): string;
    /**
     * Returns `true` if the given builtin is defined in the given shader stage.
     *
     * @param {string} name - The builtin name.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {boolean} Whether the given builtin is defined in the given shader stage or not.
     */
    hasBuiltin(name: string, shaderStage?: string): boolean;
    /**
     * Builds the given shader node.
     *
     * @param {ShaderNodeInternal} shaderNode - The shader node.
     * @return {string} The WGSL function code.
     */
    buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    /**
     * Returns a builtin representing the index of a compute invocation within the scope of a workgroup load.
     *
     * @return {string} The invocation local index.
     */
    getInvocationLocalIndex(): string;
    /**
     * Returns a builtin representing the size of a subgroup within the current shader.
     *
     * @return {string} The subgroup size.
     */
    getSubgroupSize(): string;
    /**
     * Returns a builtin representing the index of a compute invocation within the scope of a subgroup.
     *
     * @return {string} The invocation subgroup index.
     */
    getInvocationSubgroupIndex(): string;
    /**
     * Returns a builtin representing the index of a compute invocation's subgroup within its workgroup.
     *
     * @return {string} The subgroup index.
     */
    getSubgroupIndex(): string;
    /**
     * Overwritten as a NOP since this method is intended for the WebGL 2 backend.
     *
     * @return {null} Null.
     */
    getDrawIndex(): null;
    /**
     * Returns the frag depth builtin.
     *
     * @return {string} The frag depth builtin.
     */
    getFragDepth(): string;
    /**
     * Returns the clip distances builtin.
     *
     * @return {string} The clip distances builtin.
     */
    getClipDistance(): string;
    /**
     * Enables the given directive for the given shader stage.
     *
     * @param {string} name - The directive name.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage to enable the directive for.
     */
    enableDirective(name: string, shaderStage?: string): void;
    /**
     * Returns the directives of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} A WGSL snippet that enables the directives of the given stage.
     */
    getDirectives(shaderStage: string): string;
    /**
     * Enables the 'subgroups' directive.
     */
    enableSubGroups(): void;
    /**
     * Enables the 'subgroups-f16' directive.
     */
    enableSubgroupsF16(): void;
    /**
     * Enables the 'clip_distances' directive.
     */
    enableClipDistances(): void;
    /**
     * Enables the 'f16' directive.
     */
    enableShaderF16(): void;
    /**
     * Enables the 'dual_source_blending' directive.
     */
    enableDualSourceBlending(): void;
    /**
     * Enables hardware clipping.
     *
     * @param {string} planeCount - The clipping plane count.
     */
    enableHardwareClipping(planeCount: string): void;
    /**
     * Returns the builtins of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} A WGSL snippet that represents the builtins of the given stage.
     */
    getBuiltins(shaderStage: string): string;
    /**
     * This method should be used when a new scoped buffer is used in context of
     * compute shaders. It adds the array to the internal data structure which is
     * later used to generate the respective WGSL.
     *
     * @param {string} name - The array name.
     * @param {string} scope - The scope.
     * @param {string} bufferType - The buffer type.
     * @param {string} bufferCount - The buffer count.
     * @return {string} The array name.
     */
    getScopedArray(name: string, scope: string, bufferType: string, bufferCount: string): string;
    /**
     * Returns the scoped arrays of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string|undefined} The WGSL snippet that defines the scoped arrays.
     * Returns `undefined` when used in the vertex or fragment stage.
     */
    getScopedArrays(shaderStage: string): string | undefined;
    /**
     * Returns the shader attributes of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the shader attributes.
     */
    getAttributes(shaderStage: string): string;
    /**
     * Returns the members of the given struct type node as a WGSL string.
     *
     * @param {StructTypeNode} struct - The struct type node.
     * @return {string} The WGSL snippet that defines the struct members.
     */
    getStructMembers(struct: StructTypeNode): string;
    /**
     * Returns the structs of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the structs.
     */
    getStructs(shaderStage: string): string;
    /**
     * Returns the variables of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the variables.
     */
    getVars(shaderStage: string): string;
    /**
     * Returns the varyings of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the varyings.
     */
    getVaryings(shaderStage: string): string;
    isCustomStruct(nodeUniform: any): any;
    /**
     * Returns the uniforms of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the uniforms.
     */
    getUniforms(shaderStage: string): string;
    /**
     * Returns the native shader method name for a given generic name.
     *
     * @param {string} method - The method name to resolve.
     * @param {?string} [output=null] - An optional output.
     * @return {string} The resolved WGSL method name.
     */
    getMethod(method: string, output?: string | null): string;
    /**
     * Returns the bitcast method name for a given input and outputType.
     *
     * @param {string} type - The output type to bitcast to.
     * @return {string} The resolved WGSL bitcast invocation.
     */
    getBitcastMethod(type: string): string;
    /**
     * Returns the float packing method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @returns {string} The resolve WGSL float packing method name.
     */
    getFloatPackingMethod(encoding: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @returns {string} The resolve WGSL float unpacking method name.
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
     * Whether the requested feature is available or not.
     *
     * @param {string} name - The requested feature.
     * @return {boolean} Whether the requested feature is supported or not.
     */
    isAvailable(name: string): boolean;
    /**
     * Returns the native shader method name for a given generic name.
     *
     * @private
     * @param {string} method - The method name to resolve.
     * @return {string} The resolved WGSL method name.
     */
    private _getWGSLMethod;
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
     * Returns a WGSL vertex shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getWGSLVertexCode;
    /**
     * Returns a WGSL fragment shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getWGSLFragmentCode;
    /**
     * Returns a WGSL compute shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @param {string} workgroupSize - The workgroup size.
     * @return {string} The vertex shader.
     */
    private _getWGSLComputeCode;
    /**
     * Returns a WGSL struct based on the given name and variables.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @return {string} The WGSL snippet representing a struct.
     */
    private _getWGSLStruct;
    /**
     * Returns a WGSL struct binding.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @param {string} access - The access.
     * @param {number} [binding=0] - The binding index.
     * @param {number} [group=0] - The group index.
     * @return {string} The WGSL snippet representing a struct binding.
     */
    private _getWGSLStructBinding;
}
import { NodeBuilder } from '../../../nodes/Nodes.js';
import NodeUniformsGroup from '../../common/nodes/NodeUniformsGroup.js';
