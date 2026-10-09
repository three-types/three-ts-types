import {
    bitcast,
    float,
    floatBitsToInt,
    floatBitsToUint,
    int,
    intBitsToFloat,
    ivec2,
    ivec3,
    ivec4,
    uint,
    uintBitsToFloat,
    uvec2,
    uvec3,
    uvec4,
    vec2,
    vec3,
    vec4,
} from "three/tsl";
import { BitcastNode, Node, VarNode } from "three/webgpu";

const floatBitsToInt1: Node<"int"> = floatBitsToInt(float(1));
const floatBitsToInt2: Node<"ivec2"> = floatBitsToInt(vec2(1));
const floatBitsToInt3: Node<"ivec3"> = floatBitsToInt(vec3(1));
const floatBitsToInt4: Node<"ivec4"> = floatBitsToInt(vec4(1));
const floatBitsToUint1: Node<"uint"> = floatBitsToUint(float(1));
const floatBitsToUint2: Node<"uvec2"> = floatBitsToUint(vec2(1));
const floatBitsToUint3: Node<"uvec3"> = floatBitsToUint(vec3(1));
const floatBitsToUint4: Node<"uvec4"> = floatBitsToUint(vec4(1));
const intBitsToFloat1: Node<"float"> = intBitsToFloat(int(1));
const intBitsToFloat2: Node<"vec2"> = intBitsToFloat(ivec2(1));
const intBitsToFloat3: Node<"vec3"> = intBitsToFloat(ivec3(1));
const intBitsToFloat4: Node<"vec4"> = intBitsToFloat(ivec4(1));
const uintBitsToFloat1: Node<"float"> = uintBitsToFloat(uint(1));
const uintBitsToFloat2: Node<"vec2"> = uintBitsToFloat(uvec2(1));
const uintBitsToFloat3: Node<"vec3"> = uintBitsToFloat(uvec3(1));
const uintBitsToFloat4: Node<"vec4"> = uintBitsToFloat(uvec4(1));

const explicit: VarNode<"uvec2", BitcastNode<"uvec2">> = bitcast(vec2(1), "uvec2");
const direct: Node<"uvec2"> = new BitcastNode(vec2(1), "uvec2");
const sized: Node<"uvec2"> = new BitcastNode(vec2(1), "uint", "float");
const nullable: Node<"uint"> = new BitcastNode(float(1), "uint", null);
floatBitsToUint(vec2(1)).x.add(1);

// @ts-expect-error Vector bitcasts preserve the vector width.
const wrongScalar: Node<"uint"> = floatBitsToUint(vec2(1));
// @ts-expect-error A float-to-uint bitcast does not return float components.
const wrongComponents: Node<"vec3"> = floatBitsToUint(vec3(1));

declare const unknownNode: Node;
const unknownResult: BitcastNode = floatBitsToUint(unknownNode);
// @ts-expect-error An unknown input does not imply a scalar output.
const wrongUnknown: Node<"uint"> = floatBitsToUint(unknownNode);
