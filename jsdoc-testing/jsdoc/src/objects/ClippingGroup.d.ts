/**
 * In earlier three.js versions, clipping was defined globally
 * on the renderer or on material level. This special version of
 * `THREE.Group` allows to encode the clipping state into the scene
 * graph. Meaning if you create an instance of this group, all
 * descendant 3D objects will be affected by the respective clipping
 * planes.
 *
 * Note: `ClippingGroup` can only be used with `WebGPURenderer`.
 *
 * @augments Group
 */
export class ClippingGroup extends Group {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isClippingGroup: boolean;
    /**
     * An array with clipping planes.
     *
     * @type {Array<Plane>}
     */
    clippingPlanes: Array<Plane>;
    /**
     * Whether clipping should be enabled or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * Whether the intersection of the clipping planes is used to clip objects, rather than their union.
     *
     * @type {boolean}
     * @default false
     */
    clipIntersection: boolean;
    /**
     * Whether shadows should be clipped or not.
     *
     * @type {boolean}
     * @default false
     */
    clipShadows: boolean;
}
import { Group } from './Group.js';
