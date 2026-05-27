/**
 * ~Func
 */
export type ParametricGeometry = (u: number, v: number, target: Vector3) => any;
import { Vector3 } from 'three';
/**
 * This class can be used to generate a geometry based on a parametric surface.
 *
 * Reference: [Mesh Generation with Python](https://prideout.net/blog/old/blog/index.html@p=44.html)
 *
 * ```js
 * const geometry = new THREE.ParametricGeometry( klein, 25, 25 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const klein = new THREE.Mesh( geometry, material );
 * scene.add( klein );
 * ```
 *
 * @augments BufferGeometry
 * @three_import import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
 */
export class ParametricGeometry extends BufferGeometry {
    /**
     * Constructs a new parametric geometry.
     *
     * @param {ParametricGeometry~Func} func - The parametric function. Default is a function that generates a curved plane surface.
     * @param {number} [slices=8] - The number of slices to use for the parametric function.
     * @param {number} [stacks=8] - The stacks of slices to use for the parametric function.
     */
    constructor(func?: (u: any, v: any, target: any) => any, slices?: number, stacks?: number);
    /**
     * Holds the constructor parameters that have been
     * used to generate the geometry. Any modification
     * after instantiation does not change the geometry.
     *
     * @type {Object}
     */
    parameters: Object;
    copy(source: any): this;
}
import { BufferGeometry } from 'three';
