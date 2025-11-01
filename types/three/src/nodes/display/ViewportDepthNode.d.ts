import Node from "../core/Node.js";

declare class ViewportDepthNode extends Node<"float"> {
    scope: ViewportDepthNodeScope;
    valueNode: Node;

    readonly isViewportDepthNode: true;

    constructor(scope: ViewportDepthNodeScope, valueNode?: Node | null);

    static DEPTH_BASE: "depthBase";
    static DEPTH: "depth";
    static LINEAR_DEPTH: "linearDepth";
}

export type ViewportDepthNodeScope =
    | typeof ViewportDepthNode.DEPTH_BASE
    | typeof ViewportDepthNode.DEPTH
    | typeof ViewportDepthNode.LINEAR_DEPTH;

export default ViewportDepthNode;

export const viewZToOrthographicDepth: (viewZ: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const orthographicDepthToViewZ: (depth: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const viewZToPerspectiveDepth: (viewZ: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const perspectiveDepthToViewZ: (depth: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const viewZToLogarithmicDepth: (viewZ: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const logarithmicDepthToViewZ: (depth: Node<"float">, near: Node<"float">, far: Node<"float">) => Node<"float">;

export const depth: ViewportDepthNode;
export const linearDepth: (valueNode?: Node | null) => ViewportDepthNode;
export const viewportLinearDepth: ViewportDepthNode;
