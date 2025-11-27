import Node from "./Node.js";
import TempNode from "./TempNode.js";

interface ArrayNodeInterface {
    count: number;
    values: Node[];
    readonly isArrayNode: true;
}

declare const ArrayNode: {
    new<TNodeValue>(nodeType: string, count: number, values: Node[]): ArrayNode<TNodeValue>;
};

type ArrayNode<TNodeValue> = TempNode<TNodeValue> & ArrayNodeInterface;

export default ArrayNode;

interface ArrayFunction {
    <TNodeValue>(values: Node[]): ArrayNode<TNodeValue>;
    <TNodeValue>(nodeType: string, count: number): ArrayNode<TNodeValue>;
}

export const array: ArrayFunction;

declare module "./Node.js" {
    interface NodeElements {
        toArray: <TNodeValue>(count: number) => ArrayNode<TNodeValue>;
        toArrayAssign: (count: number) => this;
    }
}
