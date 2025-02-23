import ContextNode from "../core/ContextNode.js";
import LightingModel, { LightingModelIndirectInput } from "../core/LightingModel.js";
import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import LightsNode from "./LightsNode.js";

export default class LightingContextNode extends ContextNode {
    lightingModelNode: LightingModel | null;
    backdropNode: Node | null;
    backdropAlphaNode: Node | null;

    constructor(
        lightsNode: LightsNode,
        lightingModel?: LightingModel | null,
        backdropNode?: Node | null,
        backdropAlphaNode?: Node | null,
    );

    getContext(): LightingModelIndirectInput;
}

export const lightingContext: (node: LightsNode, lightingModelNode?: LightingModel) => ShaderNodeObject<LightingContextNode>;
