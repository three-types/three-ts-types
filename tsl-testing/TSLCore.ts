import * as THREE from "three/webgpu";
import { vec2, vec3 } from "three/tsl";

/**
 * Setup
 */

const testVec2 = vec2(2, 3);
const testVec3 = vec3(1, 0, 2);

/**
 * Access swizzle properties
 */

const testVec2Swizzle: THREE.Node<"vec2"> = testVec3.xy;

// @ts-expect-error
testVec2.xz;

/**
 * Assign swizzle properties
 */

testVec3.x = 5;
testVec3.xy = testVec2;
testVec3.xy = 6;

// @ts-expect-error
testVec3.xy = testVec3;

// @ts-expect-error
testVec3.xx = 5;

/**
 * Set swizzle methods
 */

testVec3.setXY(5);
testVec3.setXY(testVec2);
testVec3.setXZ(3);

// @ts-expect-error
testVec3.setXY(testVec3);

// @ts-expect-error
testVec3.setXX(5);

/**
 * Flip swizzle methods
 */

testVec3.flipX();
testVec3.flipXZ();

// @ts-expect-error
testVec3.flipZX();

// @ts-expect-error
testVec3.flipXX();
