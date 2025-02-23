import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
import StackNode from "./StackNode.js";

export interface LightingModelReflectedLight {
    directDiffuse: Node;
    directSpecular: Node;
    indirectDiffuse: Node;
    indirectSpecular: Node;
}

export interface LightingModelDirectInput {
    lightDirection: Node;
    lightColor: Node;
    reflectedLight: LightingModelReflectedLight;
}

export interface LightingModelDirectRectAreaInput {
    lightColor: Node;
    lightPosition: Node;
    halfWidth: Node;
    halfHeight: Node;
    reflectedLight: LightingModelReflectedLight;
    ltc_1: Node;
    ltc_2: Node;
}

export interface LightingModelIndirectInput {
    radiance: Node;
    irradiance: Node;
    iblIrradiance: Node;
    ambientOcclusion: Node;
    reflectedLight: LightingModelReflectedLight;
    backdrop: Node;
    backdropAlpha: Node;
    outgoingLight: Node;
}

declare class LightingModel {
    start(builder: NodeBuilder): void;
    finish(builder: NodeBuilder): void;
    // TODO Fix parameters
    direct(input: LightingModelDirectInput, stack: StackNode, builder: NodeBuilder): void;
    // TODO Fix parameters
    directRectArea(input: LightingModelDirectRectAreaInput, stack: StackNode, builder: NodeBuilder): void;
    indirect(builder: NodeBuilder): void;
    ambientOcclusion(builder: NodeBuilder): void;
}

export default LightingModel;
