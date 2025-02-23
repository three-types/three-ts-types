import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import LightingNode from "./LightingNode.js";
import ShadowNode from "./ShadowNode.js";
import NodeBuilder from '../core/NodeBuilder.js';

declare module "../../lights/LightShadow.js" {
    export interface LightShadow {
        shadowNode?: Node;
    }
}

declare class AnalyticLightNode<T extends Light> extends LightingNode {
    light: T | null;

    constructor(light?: T | null);

    getLightVector(builder: NodeBuilder): Node;

    setupDirect(builder: NodeBuilder): void;

    setupDirectRectArea(builder: NodeBuilder): void;

    setupShadowNode(): ShaderNodeObject<ShadowNode>;

    setupShadow(builder: NodeBuilder): void;
}

export default AnalyticLightNode;
