import { InterpolationSamplingMode, InterpolationSamplingType } from "../../constants.js";
import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeVarying from "./NodeVarying.js";

interface VaryingNodeInterface {
    node: Node;
    name: string | null;
    readonly isVaryingNode: true;
    interpolationType: InterpolationSamplingType | null;
    interpolationSampling: InterpolationSamplingMode | null;

    setInterpolation(type: InterpolationSamplingType | null, sampling?: InterpolationSamplingMode | null): this;

    setupVarying(builder: NodeBuilder): NodeVarying;
}

declare const VaryingNode: {
    new<TNodeType>(node: Node<TNodeType>, name?: string | null): VaryingNode<TNodeType>;
};

type VaryingNode<TNodeType> = VaryingNodeInterface & Node<TNodeType>;

export const varying: <TNodeType>(node: Node<TNodeType>, name?: string) => VaryingNode<TNodeType>;

export const vertexStage: <TNodeType>(node: Node<TNodeType>) => VaryingNode<TNodeType>;

declare module "./Node.js" {
    interface NodeExtensions<TValue> {
        toVarying: (name?: string) => VaryingNode<TValue>;
        toVaryingAssign: (name?: string) => this;

        toVertexStage: () => VaryingNode<TValue>;
        toVertexStageAssign: () => this;

        /**
         * @deprecated .vertexStage() has been renamed to .toVertexStage().
         */
        vertexStage: () => VaryingNode<TValue>;
        /**
         * @deprecated .vertexStage() has been renamed to .toVertexStage().
         */
        vertexStageAssign: () => this;
    }
}
