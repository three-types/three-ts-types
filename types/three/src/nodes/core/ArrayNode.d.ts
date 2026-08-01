import { NodeObject } from "../tsl/TSLCore.js";
import Node from "./Node.js";
import TempNode from "./TempNode.js";

export interface ArrayNodeInterface<TNodeType> {
    count: number;
    values: Node<TNodeType>[] | null;
    readonly isArrayNode: true;
}

declare const ArrayNode: {
    new<TNodeType>(
        nodeType: TNodeType | null,
        count: number,
        values?: Node<TNodeType>[] | null,
    ): ArrayNode<TNodeType>;
};

type ArrayNode<TNodeType> = TempNode<TNodeType> & ArrayNodeInterface<TNodeType>;

export default ArrayNode;

type ArrayValueNodeType<TValue> = NodeObject<TValue> extends { __TypeScript_NODE_TYPE__: infer TNodeType } ? TNodeType
    : never;

interface ArrayFunction {
    <TValue>(values: TValue[]): ArrayNode<ArrayValueNodeType<TValue>>;
    <TNodeType extends string>(nodeType: TNodeType, count: number): ArrayNode<TNodeType>;
}

export const array: ArrayFunction;

declare module "./Node.js" {
    interface NodeExtensions<TNodeType> {
        toArray: (count: number) => ArrayNode<TNodeType>;
    }
}
