import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";
import { NodeBuilder } from "../Nodes.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import LightingNode from "./LightingNode.js";

declare class LightsNode extends Node {
    totalDiffuseNode: Node;
    totalSpecularNode: Node;
    outgoingLightNode: Node;

    constructor();

    setupLightsNode(builder: NodeBuilder): void;

    // TODO Parameter types
    setupDirectLight(builder: NodeBuilder, lightNode: Node, lightData): void;

    // TODO Parameter types
    setupDirectRectAreaLight(builder: NodeBuilder, lightNode: Node, lightData): void;

    setupLights(builder: NodeBuilder, lightNodes: LightingNode[]): void;

    getLightNodes(): LightingNode[];

    setLights(lights: Light[]): this;

    getLights(): Light[];

    get hasLights(): boolean;
}

export default LightsNode;

export const lights: (lights?: Light[]) => ShaderNodeObject<LightsNode>;
