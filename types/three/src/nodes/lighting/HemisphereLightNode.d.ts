import { HemisphereLight } from "../../lights/HemisphereLight.js";
import { Vector3 } from "../../math/Vector3.js";
import Object3DNode from "../accessors/Object3DNode.js";
import Node from "../core/Node.js";
import UniformNode from "../core/UniformNode.js";
import AnalyticLightNode from "./AnalyticLightNode.js";

export default class HemisphereLightNode extends AnalyticLightNode<HemisphereLight> {
    lightPositionNode: UniformNode<"vec3", Vector3>;
    lightDirectionNode: Node<"vec3">;

    groundColorNode: UniformNode<"vec3", Vector3>;

    constructor(light?: HemisphereLight | null);
}
