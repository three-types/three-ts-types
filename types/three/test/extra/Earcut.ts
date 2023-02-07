import * as THREE from 'three';

const triangles = THREE.Earcut.triangulate([0, 0, 1, 0, 1, 1, 0, 1]); // $ExpectType number[]
