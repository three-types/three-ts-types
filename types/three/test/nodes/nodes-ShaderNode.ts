/**
 * Various tests of ShaderNode and related type inference
 */

import {
    Node,
    MaterialNode,
    MathNode,
    OscNode,
    PropertyNode,
    RotateUVNode,
    OperatorNode,
    nodeArray,
    nodeImmutable,
    nodeProxy,
    ShaderNode,
} from 'three/examples/jsm/nodes/Nodes';

import { ConvertType, Swizzable } from 'three/examples/jsm/nodes/shadernode/ShaderNode';

// just to type check
function assertSwizzable(_s: Swizzable) {}
function assertNode(_s: Node) {}

export const color = new ConvertType('color');
const s = color(1);
s.xyz;

const aa = nodeArray([1, 2, 'hello']);
aa[0].xy = s;
aa[1].w = s;
aa[2] = 'hello';

export const rotateUV = nodeProxy(RotateUVNode);
assertSwizzable(rotateUV(s, s, s));

const oscNode0 = nodeProxy(OscNode);
assertSwizzable(oscNode0('sawtooth', s));

const oscNode1 = nodeProxy(OscNode, OscNode.SAWTOOTH);
assertSwizzable(oscNode1(s));

export const mix = nodeProxy(MathNode, MathNode.MIX);
assertSwizzable(mix(s, s, s));
export const cos = nodeProxy(MathNode, MathNode.COS);
assertSwizzable(cos(s));

export const oscSine0 = nodeProxy(OscNode, OscNode.SAWTOOTH, 1);
assertSwizzable(oscSine0());
export const mix0 = nodeProxy(MathNode, MathNode.MIX, 1);
assertSwizzable(mix0(s, new Node()));

export const sub = nodeProxy(OperatorNode, '-');
assertSwizzable(sub(s, new Node(), new Node(), new Node(), new Node()));
export const remainder = nodeProxy(OperatorNode, '%');
assertSwizzable(remainder(s, new Node(), new Node(), new Node(), new Node()));

assertSwizzable(nodeImmutable(MaterialNode, MaterialNode.ROTATION));
assertSwizzable(nodeImmutable(PropertyNode, 'DiffuseColor', 'vec4'));
assertSwizzable(nodeImmutable(MathNode, 'abs', 1));

export const shiftRight = nodeProxy(OperatorNode, '>>');
assertSwizzable(shiftRight(s, s, s, s));

const shader = new ShaderNode<{ a: Node; b: Node }>(params => {
    return params.a;
});
assertNode(shader.call({ a: s, b: new Node() }));
