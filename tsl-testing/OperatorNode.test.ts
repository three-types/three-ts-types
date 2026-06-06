import { beforeAll, expect, test } from 'vitest';
import { int, float, mul, vec3 } from 'three/tsl';
import * as THREE from 'three/webgpu';

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = (renderer.backend as any).createNodeBuilder(null, renderer);

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

test('mul(vec3, mat4)', () => {
    const result: THREE.Node<'vec4'> = mul(new THREE.Vector3(), new THREE.Matrix4());
    assertNode(result, 'vec4');
});

test('vec3.mul(mat4)', () => {
    const vec3Node = vec3();
    const result: THREE.Node<'vec4'> = vec3Node.mul(new THREE.Matrix4());
    assertNode(result, 'vec4');
});

test('mul(float, mat4)', () => {
    const result: THREE.Node<'mat4'> = mul(5, new THREE.Matrix4());
    assertNode(result, 'mat4');
});

test('mul(mat3, int)', () => {
    const result: THREE.Node<'mat3'> = mul(new THREE.Matrix3(), int(3));
    assertNode(result, 'mat3');
});

test('float.mul(mat4)', () => {
    const floatNode = float(5);
    const result: THREE.Node<'mat4'> = floatNode.mul(new THREE.Matrix4());
    assertNode(result, 'mat4');
});
