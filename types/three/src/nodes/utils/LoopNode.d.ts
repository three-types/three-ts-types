import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";

type LoopNodeType = "int" | "uint" | "float";

type LoopNodeValue<TNodeType extends LoopNodeType> = TNodeType extends LoopNodeType ? Node<TNodeType> | number : never;

type LoopNodeObjectParameter<TNodeType extends LoopNodeType> =
    & {
        type?: TNodeType;
        name?: string;
        condition?: string;
        update?: Node | number | string;
    }
    & (
        | { start: LoopNodeValue<TNodeType>; end?: LoopNodeValue<TNodeType> }
        | { start?: LoopNodeValue<TNodeType>; end: LoopNodeValue<TNodeType> }
    );

type LoopNodeParameter =
    | LoopNodeValue<LoopNodeType>
    | { [TNodeType in LoopNodeType]: LoopNodeObjectParameter<TNodeType> & { type: TNodeType } }[LoopNodeType]
    | (LoopNodeObjectParameter<LoopNodeType> & { type?: undefined });

type LoopVariableNames = ["i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

type LoopInputs<TParams extends readonly LoopNodeParameter[]> = {
    readonly [
        TIndex in Extract<keyof TParams, `${number}`> as TParams[TIndex] extends { name: infer TName extends string }
            ? TName
            : TIndex extends keyof LoopVariableNames ? LoopVariableNames[TIndex]
            : never
    ]: Node<TParams[TIndex] extends { type: infer TNodeType extends LoopNodeType } ? TNodeType : "int">;
};

declare class LoopNode extends Node<"void"> {
    params: unknown[];

    constructor(params?: unknown[]);

    getProperties(builder: NodeBuilder): unknown;
}

export default LoopNode;

interface Loop {
    (func: () => void): LoopNode;
    (condition: Node<"bool">, func: () => void): LoopNode;
    <const TParams extends readonly [LoopNodeParameter, ...LoopNodeParameter[]]>(
        ...params: [...TParams, func: (inputs: LoopInputs<TParams>) => void]
    ): LoopNode;
}

export const Loop: Loop;
export const Continue: () => Node;
export const Break: () => Node;
