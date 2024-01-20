import {
    LineBasicMaterial,
    Material,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    PointsMaterial,
    ShaderMaterial,
    SpriteMaterial,
} from '../../../../src/Three.js';
import NodeBuilder from '../core/NodeBuilder.js';
import Node from '../core/Node.js';
import LineBasicNodeMaterial from './LineBasicNodeMaterial.js';
import MeshBasicNodeMaterial from './MeshBasicNodeMaterial.js';
import MeshPhysicalNodeMaterial from './MeshPhysicalNodeMaterial.js';
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial.js';
import PointsNodeMaterial from './PointsNodeMaterial.js';
import SpriteNodeMaterial from './SpriteNodeMaterial.js';

export default class NodeMaterial extends ShaderMaterial {
    readonly isNodeMaterial: true;

    normals: boolean;

    colorSpaced: boolean;

    lightsNode: Node | null;
    envNode: Node | null;

    colorNode: Node | null;
    normalNode: Node | null;
    opacityNode: Node | null;
    backdropNode: Node | null;
    backdropAlphaNode: Node | null;
    alphaTestNode: Node | null;

    positionNode: Node | null;

    depthNode: Node | null;

    outputNode: Node | null;

    fragmentNode: Node | null;
    vertexNode: Node | null;

    constructor();

    build(builder: NodeBuilder): void;
    setup(builder: NodeBuilder): void;
    setupDepth(builder: NodeBuilder): void;
    setupPosition(builder: NodeBuilder): void;
    setupDiffuseColor(builder: NodeBuilder): void;
    setupVariants(builder: NodeBuilder): void;
    setupNormal(): void;
    getEnvNode(builder: NodeBuilder): void;
    setupLights(builder: NodeBuilder): void;
    setupLightingModel(builder: NodeBuilder): void;
    setupLighting(builder: NodeBuilder): void;
    setupOutput(builder: NodeBuilder, outputNode: Node): void;

    setDefaultValues(material: Material): void;

    static fromMaterial(material: LineBasicMaterial): LineBasicNodeMaterial;
    static fromMaterial(material: MeshBasicMaterial): MeshBasicNodeMaterial;
    static fromMaterial(material: MeshPhysicalMaterial): MeshPhysicalNodeMaterial;
    static fromMaterial(material: MeshStandardMaterial): MeshStandardNodeMaterial;
    static fromMaterial(material: PointsMaterial): PointsNodeMaterial;
    static fromMaterial(material: SpriteMaterial): SpriteNodeMaterial;
    static fromMaterial(material: NodeMaterial): NodeMaterial;
    static fromMaterial(material: Material): NodeMaterial;
}
