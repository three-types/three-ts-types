import { expect, test } from 'vitest';

import { color, float } from 'three/tsl';
import * as THREE from 'three/webgpu';

test('color', () => {
    let varNodeColor: THREE.VarNode<'color'> = color();
    expect(varNodeColor).toBeInstanceOf(THREE.VarNode);

    varNodeColor = color('red');
    expect(varNodeColor).toBeInstanceOf(THREE.VarNode);

    varNodeColor = color(0xff0000);
    expect(varNodeColor).toBeInstanceOf(THREE.VarNode);

    varNodeColor = color(new THREE.Color());
    expect(varNodeColor).toBeInstanceOf(THREE.VarNode);

    varNodeColor = color(0, 100, 255);
    expect(varNodeColor).toBeInstanceOf(THREE.VarNode);
});

test('float', () => {
    let varNodeFloat: THREE.VarNode<'float'> = float();
    expect(varNodeFloat).toBeInstanceOf(THREE.VarNode);

    varNodeFloat = float(5);
    expect(varNodeFloat).toBeInstanceOf(THREE.VarNode);
});
