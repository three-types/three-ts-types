import { Light } from "../../lights/Light.js";
import Node from "./Node.js";
import { NodeBuilderContext } from "./NodeBuilder.js";

declare class ContextNode extends Node {
    readonly isContextNode: true;

    node: Node | null;
    value: NodeBuilderContext;

    constructor(node?: Node | null, value?: NodeBuilderContext);
}

export default ContextNode;

interface ContextFunction {
    (value?: NodeBuilderContext): ContextNode;
    (node: Node, value?: NodeBuilderContext): ContextNode;
}

export const context: ContextFunction;

export const uniformFlow: (node: Node) => ContextNode;

export const setName: (node: Node, label: string) => Node;

export function builtinShadowContext(shadowNode: Node, light: Light, node?: Node | null): ContextNode;

export function builtinAOContext(aoNode: Node, node?: Node | null): ContextNode;

/**
 * @deprecated "label()" has been deprecated. Use "setName()" instead.
 */
export function label(node: Node, label: string): Node;

declare module "../Nodes.js" {
    interface Node {
        context: (context?: NodeBuilderContext) => ContextNode;

        /**
         * @deprecated "label()" has been deprecated. Use "setName()" instead.
         */
        label: (label: string) => Node;

        uniformFlow: () => ContextNode;

        setName: (label: string) => Node;

        builtinShadowContext: (shadowNode: Node, light: Light) => ContextNode;

        builtinAOContext: (aoValue: Node) => ContextNode;
    }
}
