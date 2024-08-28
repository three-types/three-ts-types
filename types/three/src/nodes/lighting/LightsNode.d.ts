import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";
import { NodeBuilder } from "../Nodes.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class LightsNode extends Node {
    constructor(lights?: Light[]);

    setupLightsNode(builder: NodeBuilder): void;

    setLights(lights: Light[]): this;

    getLights(): Light[];
}

export default LightsNode;

export const lights: (lights: Light[]) => ShaderNodeObject<LightsNode>;
