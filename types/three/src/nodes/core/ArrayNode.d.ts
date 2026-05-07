import Node from "./Node.js";
import TempNode from "./TempNode.js";
import ArrayElementNode from "../utils/ArrayElementNode.js";

interface ArrayNodeInterface<TNodeType> {
    count: number;
    values: Node<TNodeType>[] | null;
    readonly isArrayNode: true;

    element: (indexNode: Node | number) => ArrayElementNode<TNodeType>;
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

interface ArrayFunction {
    <TNodeType>(values: Node<TNodeType>[]): ArrayNode<TNodeType>;
    <TNodeType extends string>(nodeType: TNodeType, count: number): ArrayNode<TNodeType>;
}

export const array: ArrayFunction;

declare module "./Node.js" {
    interface NodeElements {
        toArray: <TNodeType>(this: Node<TNodeType>, count: number) => ArrayNode<TNodeType>;
    }
}
