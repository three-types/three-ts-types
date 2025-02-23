import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import LightingNode from "./LightingNode.js";
import ShadowNode from "./ShadowNode.js";

declare module "../../lights/LightShadow.js" {
    export interface LightShadow {
        shadowNode?: Node;
    }
}

declare class AnalyticLightNode<T extends Light> extends LightingNode {
    light: T | null;

    constructor(light?: T | null);

    getLightVector(builder: NodeBuilder): Node;

    // TODO Update return type
    setupDirect(builder: NodeBuilder): void;

    // TODO Update return type
    setupDirectRectArea(builder: NodeBuilder): void;

    setupShadowNode(): ShaderNodeObject<ShadowNode>;

    setupShadow(builder: NodeBuilder): void;
}

export default AnalyticLightNode;
