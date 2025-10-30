import Node from "../core/Node.js";

export default class PosterizeNode extends Node<"vec4"> {
    sourceNode: Node<"vec4">;
    stepsNode: Node<"float">;

    constructor(sourceNode: Node<"vec4">, stepsNode: Node<"float">);
}

export const posterize: (
    sourceNode: Node<"vec4">,
    stepsNode: Node<"float"> | number,
) => PosterizeNode;
