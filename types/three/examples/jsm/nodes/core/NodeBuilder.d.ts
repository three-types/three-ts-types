import {
    BufferAttribute,
    BufferGeometry,
    InterleavedBufferAttribute,
    Material,
    Object3D,
    RenderTarget,
    RenderTargetOptions,
    Scene,
    Texture,
    TypedArray,
} from "three";
import Binding from "../../renderers/common/Binding.js";
import ClippingContext from "../../renderers/common/ClippingContext.js";
import CubeRenderTarget from "../../renderers/common/CubeRenderTarget.js";
import PMREMGenerator from "../../renderers/common/extras/PMREMGenerator.js";
import {
    ColorNodeUniform,
    FloatNodeUniform,
    Matrix3NodeUniform,
    Matrix4NodeUniform,
    Vector2NodeUniform,
    Vector3NodeUniform,
    Vector4NodeUniform,
} from "../../renderers/common/nodes/NodeUniform.js";
import Renderer from "../../renderers/common/Renderer.js";
import FunctionNode from "../code/FunctionNode.js";
import FogNode from "../fog/FogNode.js";
import EnvironmentNode from "../lighting/EnvironmentNode.js";
import LightsNode from "../lighting/LightsNode.js";
import { default as NodeMaterial } from "../materials/NodeMaterial.js";
import { ShaderNodeInternal, ShaderNodeObject } from "../shadernode/ShaderNode.js";
import { NodeShaderStage } from "./constants.js";
import Node from "./Node.js";
import NodeAttribute from "./NodeAttribute.js";
import NodeCache from "./NodeCache.js";
import NodeCode from "./NodeCode.js";
import NodeKeywords from "./NodeKeywords.js";
import NodeParser from "./NodeParser.js";
import NodeUniform from "./NodeUniform.js";
import NodeVar from "./NodeVar.js";
import NodeVarying from "./NodeVarying.js";
import StackNode from "./StackNode.js";
import UniformNode from "./UniformNode.js";
interface Flow {
    code: string;
    result?: string | null | undefined;
    vars?: string | undefined;
}
interface Context {
    keywords: NodeKeywords;
    material: Material | Material[];
    tempRead?: boolean;
}
declare abstract class NodeBuilder {
    object: Object3D;
    material: Material | Material[];
    geometry: BufferGeometry;
    renderer: Renderer;
    parser: NodeParser;
    scene: Scene | null;
    nodes: Node[];
    updateNodes: Node[];
    updateBeforeNodes: Node[];
    hashNodes: {
        [hash: string]: Node;
    };
    lightsNode: LightsNode | null;
    environmentNode: EnvironmentNode | null;
    fogNode: FogNode | null;
    clippingContext: ClippingContext | null;
    vertexShader: string | null;
    fragmentShader: string | null;
    computeShader: string | null;
    flowNodes: {
        vertex: Node[];
        fragment: Node[];
        compute: Node[];
    };
    flowCode: {
        vertex: string;
        fragment: string;
        compute: string;
    };
    uniforms: {
        vertex: NodeUniform<unknown>[];
        fragment: NodeUniform<unknown>[];
        compute: NodeUniform<unknown>[];
        index: number;
    };
    structs: {
        vertex: Node[];
        fragment: Node[];
        compute: Node[];
        index: number;
    };
    bindings: {
        vertex: Binding[];
        fragment: Binding[];
        compute: Binding[];
    };
    bindingsOffset: {
        vertex: number;
        fragment: number;
        compute: number;
    };
    bindingsArray: Binding[] | null;
    attributes: NodeAttribute[];
    bufferAttributes: NodeAttribute[];
    varyings: NodeVarying[];
    codes: {
        vertex?: NodeCode[] | undefined;
        fragment?: NodeCode[] | undefined;
        compute?: NodeCode[] | undefined;
    };
    vars: {
        vertex?: NodeVar[] | undefined;
        fragment?: NodeVar[] | undefined;
        compute?: NodeVar[] | undefined;
    };
    flow: Flow;
    chaining: Node[];
    stack: ShaderNodeObject<StackNode>;
    stacks: ShaderNodeObject<StackNode>[];
    tab: string;
    currentFunctionNode: FunctionNode | null;
    context: Context;
    cache: NodeCache;
    globalCache: NodeCache;
    flowsData: WeakMap<Node, Flow>;
    shaderStage: NodeShaderStage | null;
    buildStage: string | null;
    constructor(
        object: Object3D,
        renderer: Renderer,
        parser: NodeParser,
        scene?: Scene | null,
        material?: Material | null,
    );
    createRenderTarget(width?: number, height?: number, options?: RenderTargetOptions): RenderTarget<Texture>;
    createCubeRenderTarget(size?: number, options?: RenderTargetOptions): CubeRenderTarget;
    createPMREMGenerator(): PMREMGenerator;
    includes(node: Node): boolean;
    _getSharedBindings(bindings: Binding[]): Binding[];
    getBindings(): Binding[];
    setHashNode(node: Node, hash: string): void;
    addNode(node: Node): void;
    buildUpdateNodes(): void;
    get currentNode(): Node;
    addChain(node: Node): void;
    removeChain(node: Node): void;
    getMethod(method: string): string;
    getNodeFromHash(hash: string): Node;
    addFlow(shaderStage: NodeShaderStage, node: Node): Node;
    setContext(context: Context): void;
    getContext(): Context;
    setCache(cache: NodeCache): void;
    getCache(): NodeCache;
    isAvailable(name: string): boolean;
    getVertexIndex(): void;
    getInstanceIndex(): void;
    getFrontFacing(): void;
    getFragCoord(): void;
    isFlipY(): boolean;
    generateTexture(): void;
    generateTextureLod(): void;
    generateConst(type: string | null, value?: unknown): string;
    getType(type: string | null): string | null;
    hasGeometryAttribute(name: string): boolean;
    getAttribute(name: string, type: string | null): NodeAttribute;
    getPropertyName(node: Node): string | undefined;
    isVector(type: string | null): boolean;
    isMatrix(type: string | null): boolean;
    isReference(type: string | null): boolean;
    needsColorSpaceToLinear(): boolean;
    getComponentTypeFromTexture(texture: Texture): "int" | "float" | "uint";
    getElementType(type: string): "bool" | "int" | "float" | "vec2" | "vec3" | "vec4" | "uint" | null;
    getComponentType(type: string | null): "bool" | "int" | "float" | "uint" | null;
    getVectorType(type: string | null): string | null;
    getTypeFromLength(length: number, componentType?: string | null): string | null;
    getTypeFromArray(array: TypedArray): string | undefined;
    getTypeFromAttribute(attribute: BufferAttribute | InterleavedBufferAttribute): string | null;
    getTypeLength(type: string | null): number;
    getVectorFromMatrix(type: string): string;
    changeComponentType(type: string, newComponentType: string): string | null;
    getIntegerType(type: string): string | null;
    addStack(): ShaderNodeObject<StackNode>;
    removeStack(): ShaderNodeObject<StackNode>;
    getDataFromNode(
        node: Node,
        shaderStage?: NodeShaderStage | "any",
        cache?: NodeCache | null,
    ): import("./NodeCache.js").ShaderStageNodeData;
    getNodeProperties(node: Node, shaderStage?: NodeShaderStage | "any"): {
        outputNode: Node | null;
        initialized?: boolean | undefined;
    } & {
        [x: `_node${string}`]: Node | undefined;
    };
    getBufferAttributeFromNode(node: Node, type: string | null): NodeAttribute;
    getStructTypeFromNode(node: Node, shaderStage?: NodeShaderStage): Node;
    getUniformFromNode(
        node: UniformNode<unknown>,
        type: string | null,
        shaderStage?: NodeShaderStage,
        name?: string | null,
    ): NodeUniform<unknown>;
    getVarFromNode(node: Node, name?: string | null, type?: string | null, shaderStage?: NodeShaderStage): NodeVar;
    getVaryingFromNode(node: Node, name?: string | null, type?: string | null): NodeVarying;
    getCodeFromNode(node: Node, type: string | null, shaderStage?: NodeShaderStage): NodeCode;
    addLineFlowCode(code: string): this;
    addFlowCode(code: string): this;
    addFlowTab(): this;
    removeFlowTab(): this;
    getFlowData(node: Node): Flow | undefined;
    flowNode(node: Node): Flow;
    abstract buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    buildFunctionNode(shaderNode: ShaderNodeInternal): FunctionNode;
    flowShaderNode(shaderNode: ShaderNodeInternal): Flow;
    flowStagesNode(node: Node, output?: string | null): Flow;
    getFunctionOperator(): null;
    flowChildNode(node: Node, output?: string | null): Flow;
    flowNodeFromShaderStage(
        shaderStage: "vertex" | "fragment" | "compute",
        node: Node,
        output?: string | null,
        propertyName?: string | null,
    ): Flow;
    getAttributesArray(): NodeAttribute[];
    getAttributes(): void;
    getVaryings(): void;
    getVar(type: string | null, name: string): string;
    getVars(shaderStage: "vertex" | "fragment" | "compute"): string;
    getUniforms(): void;
    getCodes(shaderStage: "vertex" | "fragment" | "compute"): string;
    getHash(): string;
    setShaderStage(shaderStage: NodeShaderStage | null): void;
    getShaderStage(): NodeShaderStage | null;
    setBuildStage(buildStage: string | null): void;
    getBuildStage(): string | null;
    buildCode(): void;
    build(): this;
    getNodeUniform(
        uniformNode: NodeUniform<unknown>,
        type: string | null,
    ):
        | FloatNodeUniform
        | Vector2NodeUniform
        | Vector3NodeUniform
        | Vector4NodeUniform
        | ColorNodeUniform
        | Matrix3NodeUniform
        | Matrix4NodeUniform;
    createNodeMaterial(type?: string): NodeMaterial | undefined;
    format(snippet: string, fromType: string | null, toType: string | null): string;
    getSignature(): string;
}
export default NodeBuilder;
