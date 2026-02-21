import { expect, test } from "vitest";
import { Fn, normalWorldGeometry, vec2, vec3, vec4 } from "three/tsl";
import * as THREE from "three/webgpu";

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = renderer.backend.createNodeBuilder(
  null!,
  renderer,
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

test("vec2(2, 3)", async () => {
  const testVec2: THREE.Node<"vec2"> = vec2(2, 3);

  expect(testVec2.getNodeType(nodeBuilder)).toBe("vec2");

  scene.backgroundNode = testVec2.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2)", async () => {
  const testVec3: THREE.Node<"vec3"> = vec3(1, 0, 2);

  expect(testVec3.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).xy", async () => {
  const testVec2Swizzle: THREE.Node<"vec2"> = vec3(1, 0, 2).xy;

  expect(testVec2Swizzle.getNodeType(nodeBuilder)).toBe("vec2");

  scene.backgroundNode = testVec2Swizzle.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).x = 5", async () => {
  const fn = Fn(() => {
    const testVec3 = vec3(1, 0, 2);
    testVec3.z = 5;
    return testVec3;
  });

  const result: THREE.Node<"vec3"> = fn();

  expect(result.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = result.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).xy = vec2(2, 3)", async () => {
  const fn = Fn(() => {
    const testVec3 = vec3(1, 0, 2);
    testVec3.xy = vec2(2, 3);
    return testVec3;
  });

  const result: THREE.Node<"vec3"> = fn();

  expect(result.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = result.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).xy = 6", async () => {
  const fn = Fn(() => {
    const testVec3 = vec3(1, 0, 2);
    testVec3.xy = 6;
    return testVec3;
  });

  const result: THREE.Node<"vec3"> = fn();

  expect(result.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = result.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).xz = 6", async () => {
  const fn = Fn(() => {
    const testVec3 = vec3(1, 0, 2);
    testVec3.xz = 6;
    return testVec3;
  });

  const result: THREE.Node<"vec3"> = fn();

  expect(result.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = result.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).xz = vec2(2, 3)", async () => {
  const fn = Fn(() => {
    const testVec3 = vec3(1, 0, 2);
    testVec3.xz = vec2(2, 3);
    return testVec3;
  });

  const result: THREE.Node<"vec3"> = fn();

  expect(result.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = result.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).setXY(5)", async () => {
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).setXY(5);

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec4(1, 0, 2, 5).setYZ(vec2(5, 3))", async () => {
  const testVec3Set: THREE.Node<"vec4"> = vec4(1, 0, 2, 5).setYZ(vec2(5, 3));

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec4");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).setXZ(3)", async () => {
  // This doesn't work as expected, the resulting output is:
  // vec3<f32>( vec2<f32>( 3.0 ), vec3<f32>( 1.0, 0.0, 2.0 ).z )
  // @ts-expect-error
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).setXZ(3);

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).setXZ(vec2(5, 3))", async () => {
  // This doesn't work as expected, the resulting output is:
  // vec3<f32>( vec2<f32>( 5.0, 3.0 ), vec3<f32>( 1.0, 0.0, 2.0 ).z )
  // @ts-expect-error
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).setXZ(vec2(5, 3));

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).setYZ(3)", async () => {
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).setYZ(3);

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).flipX()", async () => {
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).flipX();

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).flipXY()", async () => {
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).flipXY();

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).flipXZ()", async () => {
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).flipXZ();

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("vec3(1, 0, 2).flipZX()", async () => {
  // This is functions correctly, but we don't include it to cut down on the number of methods
  // @ts-expect-error
  const testVec3Set: THREE.Node<"vec3"> = vec3(1, 0, 2).flipZX();

  expect(testVec3Set.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = testVec3Set.debug();

  await renderer.init();
  renderer.render(scene, camera);
});

test("Fn inputs", async () => {
  // FIXME Fn types are widening to Fn<Node | number, Node<"vec3">>
  const lightSpeed = Fn(([suv_immutable]: [THREE.Node<"vec2">]) => {
    return vec3(suv_immutable, 2);
  }).setLayout({
    name: "lightSpeed",
    type: "vec3",
    inputs: [{ name: "suv", type: "vec2" }],
  });

  const lightSpeedEffect: THREE.Node<"vec3"> = lightSpeed(normalWorldGeometry);

  expect(lightSpeedEffect.getNodeType(nodeBuilder)).toBe("vec3");

  scene.backgroundNode = lightSpeedEffect.debug();

  await renderer.init();
  renderer.render(scene, camera);
});
