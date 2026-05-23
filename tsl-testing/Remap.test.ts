import { beforeAll, expect, test } from 'vitest';
import { vec2, remap } from 'three/tsl';
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

test('remap(number, number, number)', () => {
    const result: THREE.Node<'float'> = remap(0.4, 0.3, 0.5);
    assertNode(result, 'float');
});

test('remap(number, number, number, vec2, vec2)', () => {
    const result: THREE.Node<'vec2'> = remap(0.4, 0.3, 0.5, vec2(1, 3), vec2(5, 3));
    assertNode(result, 'vec2');
});
