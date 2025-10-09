/**
 * Various tests of ShaderNode and related type inference
 */

import { color, Fn, nodeArray, nodeImmutable, ShaderNode, ShaderNodeObject, Swizzable, vec3 } from "three/tsl";
import { ConstNode, MaterialNode, Node, PropertyNode } from "three/webgpu";

// just to type check
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
function assertSwizzable(_s: Swizzable) {}

const s = color(1);
s.xyz;

const aa = nodeArray([1, 2, "hello"]);
aa[0].xy = s;
aa[1].w = s;
aa[2] = "hello";

assertSwizzable(nodeImmutable(MaterialNode, MaterialNode.ROTATION));
assertSwizzable(nodeImmutable(PropertyNode, "vec4", "DiffuseColor"));

const shader = new ShaderNode<{ a: Node; b: Node }>(params => {
    return params.a;
});
assertSwizzable(shader.call({ a: s, b: new ConstNode(1) }));

const fnWithoutArgs = Fn(() => vec3(1, 2, 3));
assertSwizzable(fnWithoutArgs());

const fnWithArrayArgs = Fn(([a, b]: [a: ShaderNodeObject<Node>, b: ShaderNodeObject<Node>]) => a.add(b));
assertSwizzable(fnWithArrayArgs(0.5, color(0.0, 0.25, 0.5)));

const fnWithArgs = Fn(({ a, b }: { a: ShaderNodeObject<Node>; b: ShaderNodeObject<Node> }) => a.add(b));
assertSwizzable(fnWithArgs({ a: 0.5, b: color(0.0, 0.25, 0.5) }));
