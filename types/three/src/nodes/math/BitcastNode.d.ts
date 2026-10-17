import Node, { NumType } from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import VarNode from "../core/VarNode.js";

interface VectorPrefix {
    float: "vec";
    int: "ivec";
    uint: "uvec";
}

type BitcastResult<TNodeType, TComponent extends NumType> = TNodeType extends NumType ? TComponent
    : TNodeType extends `${string}vec${infer TLength extends 2 | 3 | 4}` ? `${VectorPrefix[TComponent]}${TLength}`
    : unknown;

interface BitcastNodeInterface {
    valueNode: Node;
    conversionType: string;
    inputType: string | null;

    readonly isBitcastNode: true;
}

declare const BitcastNode: {
    new<TNodeType, TComponent extends NumType>(
        valueNode: Node<TNodeType>,
        conversionType: TComponent,
        inputType: NumType,
    ): BitcastNode<BitcastResult<TNodeType, TComponent>>;
    new<TNodeType extends string>(
        valueNode: Node,
        conversionType: TNodeType,
        inputType?: null,
    ): BitcastNode<TNodeType>;
    new(valueNode: Node, conversionType: string, inputType: string | null): BitcastNode;
};

type BitcastNode<TNodeType = unknown> = TempNode<TNodeType> & BitcastNodeInterface;

export default BitcastNode;

export const bitcast: <TNodeType extends string>(
    x: Node | number,
    y: TNodeType,
) => VarNode<TNodeType, BitcastNode<TNodeType>>;

export const floatBitsToInt: <TNodeType>(value: Node<TNodeType>) => BitcastNode<BitcastResult<TNodeType, "int">>;
export const floatBitsToUint: <TNodeType>(value: Node<TNodeType>) => BitcastNode<BitcastResult<TNodeType, "uint">>;
export const intBitsToFloat: <TNodeType>(value: Node<TNodeType>) => BitcastNode<BitcastResult<TNodeType, "float">>;
export const uintBitsToFloat: <TNodeType>(value: Node<TNodeType>) => BitcastNode<BitcastResult<TNodeType, "float">>;
