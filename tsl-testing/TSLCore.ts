import { Fn, time, vec2, vec3 } from "three/tsl";
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

// Disallow elements that are not right next to each other, they are not handled properly
// @ts-expect-error
testVec3.setXZ(3);

// vec2s don't have a z property
// @ts-expect-error
testVec2.setXZ(testVec2);

// Disallow passing a vec of the wrong size when setting a vec swizzle property
// @ts-expect-error
testVec3.setXY(testVec3);

// Disallow elements that are not right next to each other, they are not handled properly
// @ts-expect-error
testVec3.setXZ(testVec2);

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

// Disallow out-of-order identifiers. They are functionally identically to the sorted variant, and unnecessarily add to
// the number of available methods
// @ts-expect-error
testVec3.flipZX();

// Disallow duplicate identifiers when flipping a vec swizzle property
// @ts-expect-error
testVec3.flipXX();

/**
 * Fn
 */

// From three.js/docs/TSL.md
const oscSine = Fn(([t = time]: [THREE.Node<"float">] | []) => {
  return t
    .add(0.75)
    .mul(Math.PI * 2)
    .sin()
    .mul(0.5)
    .add(0.5);
});
const result1: THREE.Node<"float"> = oscSine();
const result2: THREE.Node<"float"> = oscSine(5);

// From three.js/docs/TSL.md
const oscSine2 = Fn(({ timer = time }: { timer?: THREE.Node<"float"> }) => {
  return timer
    .add(0.75)
    .mul(Math.PI * 2)
    .sin()
    .mul(0.5)
    .add(0.5);
});
const value1: THREE.Node<"float"> = oscSine({ timer: 5 });
const value2: THREE.Node<"float"> = oscSine();

const oscSine3 = Fn(({ timer }: { timer: THREE.Node<"float"> }) => {
  return timer
    .add(0.75)
    .mul(Math.PI * 2)
    .sin()
    .mul(0.5)
    .add(0.5);
});
// Parameter should be required
// @ts-expect-error
const value3: THREE.Node<"float"> = oscSine3();

// From three.js/docs/TSL.md
const col = Fn(
  ({
    r,
    g,
    b,
  }: {
    r: THREE.Node<"float">;
    g: THREE.Node<"float">;
    b: THREE.Node<"float">;
  }) => {
    return vec3(r, g, b);
  },
);
// Any of the options below will return a green color.
const output1: THREE.Node<"vec3"> = col(0, 1, 0); // option 1
const output2: THREE.Node<"vec3"> = col({ r: 0, g: 1, b: 0 }); // option 2
