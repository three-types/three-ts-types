import Node from "../core/Node.js";

export default abstract class LightingNode extends Node<"vec3"> {
    readonly isLightingNode: true;

    constructor();
}
