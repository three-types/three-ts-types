import { BufferAttribute, InterleavedBufferAttribute, Object3D, Scene, Texture } from "three";
import StructTypeNode from "../../../nodes/core/StructTypeNode.js";
import {
    BufferAttributeNode,
    NodeBuilder,
    NodeShaderStage,
    ShaderNodeInternal,
    ShaderNodeObject,
    StorageArrayElementNode,
    StorageBufferNode,
    UniformNode,
} from "../../../nodes/Nodes.js";
import NodeUniformsGroup from "../../common/nodes/NodeUniformsGroup.js";
import Renderer from "../../common/Renderer.js";
export interface Transform {
    varyingName: string | null | undefined;
    attributeNode: ShaderNodeObject<BufferAttributeNode>;
}
interface StageData {
    uniforms?: string | undefined;
    attributes?: string | undefined;
    varyings?: string | undefined;
    vars?: string | undefined;
    structs?: string | undefined;
    codes?: string | undefined;
    transforms?: string | undefined;
    flow?: string | undefined;
}
declare class GLSLNodeBuilder extends NodeBuilder {
    uniformGroups: {
        vertex?: {
            [groupName: string]: NodeUniformsGroup | undefined;
        };
        fragment?: {
            [groupName: string]: NodeUniformsGroup | undefined;
        };
        compute?: {
            [groupName: string]: NodeUniformsGroup | undefined;
        };
    };
    transforms: Transform[];
    constructor(object: Object3D, renderer: Renderer, scene?: Scene | null);
    getMethod(method: string): string;
    getPropertyName(node: unknown, shaderStage?: NodeShaderStage): string | undefined;
    buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    setupPBO(storageBufferNode: StorageBufferNode): void;
    generatePBO(storageArrayElementNode: StorageArrayElementNode): string | undefined;
    generateTextureLoad(
        texture: Texture | null,
        textureProperty: string | undefined,
        uvIndexSnippet: string,
        depthSnippet: string | null,
        levelSnippet?: string,
    ): string;
    generateTexture(
        texture: Texture,
        textureProperty: string,
        uvSnippet: string | null,
        depthSnippet: string | null,
    ): string;
    generateTextureLevel(
        texture: Texture,
        textureProperty: string,
        uvSnippet: string | null,
        levelSnippet: string | null,
    ): string;
    generateTextureGrad(
        texture: Texture,
        textureProperty: string,
        uvSnippet: string | null,
        gradSnippet: [string, string] | null,
    ): string;
    generateTextureCompare(
        texture: Texture,
        textureProperty: string,
        uvSnippet: string | null,
        compareSnippet: string | null,
        depthSnippet: string | null,
        shaderStage?: NodeShaderStage | null,
    ): string;
    getVars(shaderStage: "vertex" | "fragment" | "compute"): string;
    getUniforms(shaderStage: "vertex" | "fragment" | "compute"): string;
    getTypeFromAttribute(attribute: BufferAttribute | InterleavedBufferAttribute): string | null;
    getAttributes(shaderStage: NodeShaderStage): string;
    getStructMembers(struct: StructTypeNode): string;
    getStructs(shaderStage: NodeShaderStage): string;
    getVaryings(shaderStage: NodeShaderStage): string;
    getVertexIndex(): string;
    getInstanceIndex(): string;
    getFrontFacing(): string;
    getFragCoord(): string;
    getFragDepth(): string;
    isAvailable(name: string): boolean;
    isFlipY(): boolean;
    registerTransform(
        varyingName: string | null | undefined,
        attributeNode: ShaderNodeObject<BufferAttributeNode>,
    ): void;
    getTransforms(shaderStage: NodeShaderStage): string;
    _getGLSLUniformStruct(name: string, vars: string): string;
    _getGLSLVertexCode(shaderData: StageData): string;
    _getGLSLFragmentCode(shaderData: StageData): string;
    buildCode(): void;
    getUniformFromNode(
        node: UniformNode<unknown>,
        type: string | null,
        shaderStage: "vertex" | "fragment" | "compute",
        name?: string | null,
    ): import("../../../nodes/Nodes.js").NodeUniform<unknown>;
}
export default GLSLNodeBuilder;
