/**
 * This class can be used to create a decal mesh that serves different kinds of purposes e.g.
 * adding unique details to models, performing dynamic visual environmental changes or covering seams.
 *
 * Please not that decal projections can be distorted when used around corners. More information at
 * this GitHub issue: [Decal projections without distortions](https://github.com/mrdoob/three.js/issues/21187).
 *
 * Reference: [How to project decals](http://blog.wolfire.com/2009/06/how-to-project-decals/)
 *
 * ```js
 * const geometry = new DecalGeometry( mesh, position, orientation, size );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @three_import import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
 */
export class DecalGeometry extends BufferGeometry {
    /**
     * Constructs a new decal geometry.
     *
     * @param {Mesh} [mesh] - The base mesh the decal should be projected on.
     * @param {Vector3} [position] - The position of the decal projector.
     * @param {Euler} [orientation] - The orientation of the decal projector.
     * @param {Vector3} [size] - The scale of the decal projector.
     */
    constructor(mesh?: Mesh, position?: Vector3, orientation?: Euler, size?: Vector3);
}
export class DecalVertex {
    constructor(position: any, normal?: null);
    position: any;
    normal: any;
    clone(): any;
}
import { BufferGeometry } from 'three';
import { Mesh } from 'three';
import { Vector3 } from 'three';
import { Euler } from 'three';
