import { compute, computeKernel, Fn } from "three/tsl";
import { ComputeNode, IndirectStorageBufferAttribute } from "three/webgpu";

const body = Fn(() => {})();
const indirect = new IndirectStorageBufferAttribute(new Uint32Array([1, 1, 1]), 1);
const kernel = computeKernel(body, [64]);

kernel.count = 64;
kernel.count = null;
kernel.dispatchSize = 64;
kernel.dispatchSize = [1, 1, 1];
kernel.dispatchSize = indirect;
kernel.dispatchSize = null;

const array: ComputeNode = compute(body, [1, 1, 1], [64]);
const indirectNode: ComputeNode = compute(body, indirect, [64]);
const chainedArray: ComputeNode = body.compute([1, 1, 1], [64]);
const chainedIndirect: ComputeNode = body.compute(indirect, [64]);

// @ts-expect-error Dispatch arrays belong to dispatchSize, not the scalar count.
kernel.count = [1, 1, 1];
// @ts-expect-error This method was removed from the runtime.
kernel.setCount(64);
// @ts-expect-error This method was removed from the runtime.
kernel.getCount();
// @ts-expect-error Dispatch sizes do not accept strings.
compute(body, "64");
