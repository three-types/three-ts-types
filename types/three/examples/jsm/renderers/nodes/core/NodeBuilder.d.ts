import { Vector2, Vector3, Vector4, Color, Material, Renderer } from './../../../../../src/Three';

import Node from './Node';
import NodeUniform from './NodeUniform';
import NodeAttribute from './NodeAttribute';
import NodeVary from './NodeVary';
import NodeSlot from './NodeSlot';

type Defines = { vertex: { [key: string]: any }; fragment: { [key: string]: any } };

export class NodeBuilder<TMaterial extends Material = Material, TRenderer extends Renderer = Renderer> {
    material: TMaterial;
    renderer: TRenderer;

    nodes: Node[];
    updateNodes: Node[];

    vertexShader: string | null;
    fragmentShader: string | null;

    slots: { vertex: NodeSlot[]; fragment: NodeSlot[] };
    defines: Defines;
    uniforms: { vertex: NodeUniform[]; fragment: NodeUniform[] };
    attributes: Array<NodeAttribute>;
    varys: Array<NodeVary>;

    nodesData: WeakMap<Node, Defines>;

    shaderStage: string | null;

    constructor(material: TMaterial, renderer: TRenderer);

    addNode: (node: Node) => void;

    addSlot: (shaderStage: string, slot: NodeSlot) => void;

    define: (shaderStage: string, name: string, value: any) => void;

    getTexture: () => void;

    getConst: (type: string, value: Vector2 | Vector3 | Vector4 | Color | number) => string;

    getAttribute: (name: string, type: string) => NodeAttribute;

    getPropertyName: (node: NodeVary) => string;

    isVector: (type: string) => boolean;

    isMatrix: (type: string) => boolean;

    isShaderStage: (type: string) => boolean;

    getVectorType: (type: string) => string;

    getTypeFromLength: (type: number) => string | number;

    getTypeLength: (type: string) => number;

    getDataFromNode: <TNode extends Node>(node: TNode, shaderStage?: string) => { [key: string]: any };

    getUniformFromNode: <TNode extends Node = Node>(node: TNode, shaderStage: string, type: string) => NodeUniform;

    getVaryFromNode: (node: Node, type: string) => NodeVary;

    flowNode: <TNode extends Node>(node: TNode, output: string) => { result: string };

    _buildDefines: (shader: string) => string;

    getAttributesBodySnippet: () => void;

    getAttributesHeaderSnippet: () => void;

    getVarysHeaderSnippet: () => void;

    getVarysBodySnippet: () => void;

    getUniformsHeaderSnippe: () => void;

    getHash: () => string;

    build: () => NodeBuilder<TMaterial, TRenderer>;

    format: (snippet: string, fromType: string, toType: string) => string;
}

export default NodeBuilder;
