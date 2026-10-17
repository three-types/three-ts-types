import Node, { IntegerType } from "../core/Node.js";
import VarNode from "../core/VarNode.js";
import MathNode from "./MathNode.js";

export type BitcountNodeMethod =
    | typeof BitcountNode.COUNT_TRAILING_ZEROS
    | typeof BitcountNode.COUNT_LEADING_ZEROS
    | typeof BitcountNode.COUNT_ONE_BITS;

declare class BitcountNode extends MathNode {
    readonly isBitcountNode: true;

    constructor(method: BitcountNodeMethod, aNode: Node);

    static get COUNT_TRAILING_ZEROS(): "countTrailingZeros";
    static get COUNT_LEADING_ZEROS(): "countLeadingZeros";
    static get COUNT_ONE_BITS(): "countOneBits";
}

export default BitcountNode;

interface Bitcount {
    <TNodeType extends IntegerType | `${"i" | "u"}vec${2 | 3 | 4}`>(
        x: Node<TNodeType>,
    ): VarNode<TNodeType, BitcountNode & Node<TNodeType>>;
    (x: Node | number): VarNode<unknown, BitcountNode>;
}

export const countTrailingZeros: Bitcount;
export const countLeadingZeros: Bitcount;
export const countOneBits: Bitcount;
