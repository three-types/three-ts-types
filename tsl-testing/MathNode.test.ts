import { beforeAll, expect, test } from 'vitest';
import { all, any, atan, bvec2, bvec3, int, normalize, radians, sign, uvec3, vec2, vec3 } from 'three/tsl';
import * as THREE from 'three/webgpu';

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = renderer.backend.createNodeBuilder(null!, renderer);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

beforeAll(async () => {
    await renderer.init();
});

function assertNode<TNodeType>(node: THREE.Node<TNodeType>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.Node);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);

    scene.backgroundNode = node.debug();
    renderer.render(scene, camera);
}

test('all(boolean)', () => {
    const result: THREE.Node<'bool'> = all(true);
    assertNode(result, 'bool');
});

test('all(Node<"bvec2">)', () => {
    const vec = bvec2(true, false);
    const result: THREE.Node<'bool'> = all(vec);
    assertNode(result, 'bool');
});

test('bvec3.all()', () => {
    const vec = bvec3(true, false, true);
    const result: THREE.Node<'bool'> = vec.all();
    assertNode(result, 'bool');
});

test('any(boolean)', () => {
    const result: THREE.Node<'bool'> = any(true);
    assertNode(result, 'bool');
});

test('any(Node<"bvec2">)', () => {
    const vec = bvec2(true, false);
    const result: THREE.Node<'bool'> = any(vec);
    assertNode(result, 'bool');
});

test('bvec3.any()', () => {
    const vec = bvec3(true, false, true);
    const result: THREE.Node<'bool'> = vec.any();
    assertNode(result, 'bool');
});

test('radians(number)', () => {
    const result: THREE.Node<'float'> = radians(3);
    assertNode(result, 'float');
});

test('radians(int)', () => {
    const intNode = int(3);
    // This is likely to be a mistake because it returns an integer
    // @ts-expect-error
    radians(intNode);
});

test('radians(vec2)', () => {
    const vec = vec2(3, 1);
    const result: THREE.Node<'vec2'> = radians(vec);
    assertNode(result, 'vec2');
});

test('vec3.radians()', () => {
    const vec = vec3(3, 1);
    const result: THREE.Node<'vec3'> = vec.radians();
    assertNode(result, 'vec3');
});

test('radians(Vector4)', () => {
    const vector = new THREE.Vector4(1, 2, 3, 4);
    const result: THREE.Node<'vec4'> = radians(vector);
    assertNode(result, 'vec4');
});

test('normalize(vec2)', () => {
    const vec = vec2(3, 1);
    const result: THREE.Node<'vec2'> = normalize(vec);
    assertNode(result, 'vec2');
});

test('vec3.normalize()', () => {
    const vec = vec3(3, 1);
    const result: THREE.Node<'vec3'> = normalize(vec);
    assertNode(result, 'vec3');
});

test('vec2.atan(number)', () => {
    const vec = vec2(3, 1);
    const result: THREE.Node<'vec2'> = vec.atan(5);
    assertNode(result, 'vec2');
});

test('atan(number, Vector3)', () => {
    const vector = new THREE.Vector3(5, 3, 1);
    const result: THREE.Node<'vec3'> = atan(5, vector);
    assertNode(result, 'vec3');
});

test('vec2.abs()', () => {
    const vec = vec2(5, 3);
    const result: THREE.Node<'vec2'> = vec.abs();
    assertNode(result, 'vec2');
});

test('abs(uvec3)', () => {
    const vec = uvec3(5, 3, 1);
    const result: THREE.Node<'uvec3'> = vec.abs();
    assertNode(result, 'uvec3');
});

test('sign(Vector4)', () => {
    const vector = new THREE.Vector4(1, 2, 3, 4);
    const result: THREE.Node<'vec4'> = sign(vector);
    assertNode(result, 'vec4');
});
