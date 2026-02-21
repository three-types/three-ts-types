import { vec2, vec3 } from "three/tsl";
import * as THREE from "three/webgpu";

/**
 * Setup
 */

const testVec2 = vec2(2, 3);
const testVec3 = vec3(1, 0, 2);

/**
 * Access swizzle properties
 */

const testVec2Swizzle: THREE.Node<"vec2"> = testVec3.xy;

// vec2s don't have a z property
// @ts-expect-error
testVec2.xz;

// Disallow mixing letters of different types
// @ts-expect-error
testVec2.xr;

/**
 * Assign swizzle properties
 */

// Allow assigning a number to a swizzle property
testVec3.x = 5;

// Allow assign a vec of the right size to a swizzle property
testVec3.xy = testVec2;

// Allow assigning a single number to a vec swizzle property
testVec3.xy = 6;

// Disallow assigning a vec of the wrong size to a vec swizzle property
// @ts-expect-error
testVec3.xy = testVec3;

// Disallow duplicate identifiers in swizzle properties
// @ts-expect-error
testVec3.xx = 5;

/**
 * Set swizzle methods
 */

// Allow passing a number when setting a vec swizzle property
testVec3.setXY(5);

// Allow passing a vec of the right size when setting a vec swizzle property
testVec3.setXY(testVec2);

// Allow elements that are not right next to each other
testVec3.setXZ(3);

// vec2s don't have a z property
// @ts-expect-error
testVec2.setXZ(testVec2);

// Disallow passing a vec of the wrong size when setting a vec swizzle property
// @ts-expect-error
testVec3.setXY(testVec3);

// Disallow duplicate identifiers when setting a vec swizzle property
// @ts-expect-error
testVec3.setXX(5);

// Disallow out-of-order identifiers, since they are sorted internally, so it
// could be confusing
// @ts-expect-error
testVec3.setYX(testVec2);

/**
 * Flip swizzle methods
 */

// Allow flipping single element
testVec3.flipX();

// Allow flipping non-contiguous elements
testVec3.flipXZ();

// vec2s don't have a z property
// @ts-expect-error
testVec2.flipXZ();

// Disallow out-of-order identifiers, since they are sorted internally
// @ts-expect-error
testVec3.flipZX();

// Disallow duplicate identifiers when flipping a vec swizzle property
// @ts-expect-error
testVec3.flipXX();
