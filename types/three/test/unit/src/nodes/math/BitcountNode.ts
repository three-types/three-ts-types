import {
    countLeadingZeros,
    countOneBits,
    countTrailingZeros,
    int,
    ivec2,
    ivec3,
    ivec4,
    uint,
    uvec2,
    uvec3,
    uvec4,
} from "three/tsl";
import { BitcountNode, Node, VarNode } from "three/webgpu";

const countOneBitsint: Node<"int"> = countOneBits(int(1));
const countOneBitsuint: Node<"uint"> = countOneBits(uint(1));
const countOneBitsivec2: Node<"ivec2"> = countOneBits(ivec2(1));
const countOneBitsuvec2: Node<"uvec2"> = countOneBits(uvec2(1));
const countOneBitsivec3: Node<"ivec3"> = countOneBits(ivec3(1));
const countOneBitsuvec3: Node<"uvec3"> = countOneBits(uvec3(1));
const countOneBitsivec4: Node<"ivec4"> = countOneBits(ivec4(1));
const countOneBitsuvec4: Node<"uvec4"> = countOneBits(uvec4(1));
const countLeadingZerosint: Node<"int"> = countLeadingZeros(int(1));
const countLeadingZerosuint: Node<"uint"> = countLeadingZeros(uint(1));
const countLeadingZerosivec2: Node<"ivec2"> = countLeadingZeros(ivec2(1));
const countLeadingZerosuvec2: Node<"uvec2"> = countLeadingZeros(uvec2(1));
const countLeadingZerosivec3: Node<"ivec3"> = countLeadingZeros(ivec3(1));
const countLeadingZerosuvec3: Node<"uvec3"> = countLeadingZeros(uvec3(1));
const countLeadingZerosivec4: Node<"ivec4"> = countLeadingZeros(ivec4(1));
const countLeadingZerosuvec4: Node<"uvec4"> = countLeadingZeros(uvec4(1));
const countTrailingZerosint: Node<"int"> = countTrailingZeros(int(1));
const countTrailingZerosuint: Node<"uint"> = countTrailingZeros(uint(1));
const countTrailingZerosivec2: Node<"ivec2"> = countTrailingZeros(ivec2(1));
const countTrailingZerosuvec2: Node<"uvec2"> = countTrailingZeros(uvec2(1));
const countTrailingZerosivec3: Node<"ivec3"> = countTrailingZeros(ivec3(1));
const countTrailingZerosuvec3: Node<"uvec3"> = countTrailingZeros(uvec3(1));
const countTrailingZerosivec4: Node<"ivec4"> = countTrailingZeros(ivec4(1));
const countTrailingZerosuvec4: Node<"uvec4"> = countTrailingZeros(uvec4(1));

const variable: VarNode<"uint", BitcountNode & Node<"uint">> = countOneBits(uint(1));
variable.node.isBitcountNode; // $ExpectType true
countLeadingZeros(uvec2(1)).x.add(1);

// @ts-expect-error Bit counting preserves the input's signedness.
const wrongSignedness: Node<"int"> = countOneBits(uint(1));
// @ts-expect-error Bit counting preserves the vector width.
const wrongWidth: Node<"uvec3"> = countTrailingZeros(uvec2(1));

declare const unknownNode: Node;
countOneBits(unknownNode);
countLeadingZeros(1);
