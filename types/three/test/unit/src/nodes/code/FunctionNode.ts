/**
 * Various tests of func, fn and call
 */

import { call, code, glslFn, ProxiedObject, Swizzable, uv, wgslFn } from "three/tsl";
import { FunctionCallNode, FunctionNode, Node } from "three/webgpu";

export const mx_noise = code("whatever");
const includes = [mx_noise];

const someFunc1 = new FunctionNode<[a: Node]>();
const someFunc2 = new FunctionNode<{ a: Node }>();

// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
function assertSwizzable(_s: Swizzable) {}

type a = ProxiedObject<readonly [Node]>;

assertSwizzable(call(someFunc1, [1]));
assertSwizzable(call(someFunc1, [uv()]));
assertSwizzable(call(someFunc1, [uv().xy]));
assertSwizzable(call(someFunc2, { a: 1 }));
assertSwizzable(call(someFunc2, { a: uv() }));
assertSwizzable(call(someFunc2, { a: uv().xy }));

export const mx_cell_noise_float_call = wgslFn<[Node]>("float mx_cell_noise_float( vec3 p )", includes);
export const mx_worley_noise_float_call = wgslFn<[Node, Node, Node]>(
    "float mx_worley_noise_float( vec3 p, float jitter, int metric )",
    includes,
);
export const ab_call = wgslFn<{ a: Node; b: Node }>("float mx_cell_noise_float( vec3 p )", includes);

assertSwizzable(mx_cell_noise_float_call.call(uv()));
assertSwizzable(mx_worley_noise_float_call.call(uv(), 1, 1));
assertSwizzable(ab_call.call({ a: 1, b: uv() }));

export const mx_cell_noise_float = glslFn<[Node]>("float mx_cell_noise_float( vec3 p )", includes);
export const mx_worley_noise_float = glslFn<[Node, Node, Node]>(
    "float mx_worley_noise_float( vec3 p, float jitter, int metric )",
    includes,
);
export const ab = glslFn<{ a: Node; b: Node }>("float mx_cell_noise_float( vec3 p )", includes);

assertSwizzable(mx_cell_noise_float(uv()));
assertSwizzable(mx_worley_noise_float(uv(), 1, 1));
assertSwizzable(ab({ a: 1, b: uv() }));
