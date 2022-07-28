import { Material, ShaderMaterial } from '../../../../src/Three';
import NodeBuilder from '../core/NodeBuilder';
import Node from '../core/Node';

export default class NodeMaterial extends ShaderMaterial {
    isNodeMaterial: true;
    lights: true;
    type: string;
    constructor();

    build(builder: NodeBuilder): void;
    customProgramCacheKey(): string;
    generatePosition(builder: NodeBuilder): void;
    generateDiffuseColor(builder: NodeBuilder): void;
    generateLight(
        builder: NodeBuilder,
        {
            diffuseColorNode,
            lightingModelNode,
            lightsNode,
        }: { diffuseColorNode: Node; lightingModelNode: Node; lightsNode?: Node },
    ): void;
    generateOutput(
        builder: NodeBuilder,
        { diffuseColorNode, outgoingLightNode }: { diffuseColorNode: Node; outgoingLightNode: Node },
    ): void;
    static fromMaterial(m: Material): NodeMaterial;
}
