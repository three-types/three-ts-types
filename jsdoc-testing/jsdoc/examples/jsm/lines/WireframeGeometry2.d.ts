/**
 * A special type of line segments geometry intended for wireframe rendering.
 *
 * This is used in {@link Wireframe} to describe the shape.
 *
 * ```js
 * const geometry = new THREE.IcosahedronGeometry();
 * const wireframeGeometry = new WireframeGeometry2( geo );
 * ```
 *
 * @augments LineSegmentsGeometry
 * @three_import import { WireframeGeometry2 } from 'three/addons/lines/WireframeGeometry2.js';
 */
export class WireframeGeometry2 extends LineSegmentsGeometry {
    /**
     * Constructs a new wireframe geometry.
     *
     * @param {BufferGeometry} [geometry] - The geometry to render the wireframe for.
     */
    constructor(geometry?: BufferGeometry);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWireframeGeometry2: boolean;
}
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
