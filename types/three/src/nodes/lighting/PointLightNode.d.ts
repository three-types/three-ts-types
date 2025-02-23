import { PointLight } from "../../lights/PointLight.js";
import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import AnalyticLightNode from "./AnalyticLightNode.js";
import PointShadowNode from "./PointShadowNode.js";

// TODO Are the parameters actually nodes?
export const directPointLight: (params: {
    color: ShaderNodeObject<Node>;
    lightViewPosition: ShaderNodeObject<Node>;
    cutoffDistance: ShaderNodeObject<Node>;
    decayExponent: ShaderNodeObject<Node>;
}) => { lightDirection: ShaderNodeObject<Node>; lightColor: ShaderNodeObject<Node> };

declare class PointLightNode extends AnalyticLightNode<PointLight> {
    cutoffDistanceNode: Node;
    decayExponentNode: Node;

    constructor(light?: PointLight | null);

    setupShadowNode(): ShaderNodeObject<PointShadowNode>;
}

export default PointLightNode;
