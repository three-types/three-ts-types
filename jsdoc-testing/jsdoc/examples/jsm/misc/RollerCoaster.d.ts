/**
 * A procedural roller coaster geometry.
 *
 * @augments BufferGeometry
 * @three_import import { RollerCoasterGeometry } from 'three/addons/misc/RollerCoaster.js';
 */
export class RollerCoasterGeometry extends BufferGeometry {
    /**
     * Constructs a new geometry.
     *
     * @param {Curve} curve - The curve to generate the geometry along.
     * @param {number} divisions - The number of divisions which defines the detail of the geometry.
     */
    constructor(curve: Curve, divisions: number);
}
/**
 * A procedural roller coaster lifters geometry.
 *
 * @augments BufferGeometry
 * @three_import import { RollerCoasterLiftersGeometry } from 'three/addons/misc/RollerCoaster.js';
 */
export class RollerCoasterLiftersGeometry extends BufferGeometry {
    /**
     * Constructs a new geometry.
     *
     * @param {Curve} curve - The curve to generate the geometry along.
     * @param {number} divisions - The number of divisions which defines the detail of the geometry.
     */
    constructor(curve: Curve, divisions: number);
}
/**
 * A procedural roller coaster shadow geometry.
 *
 * @augments BufferGeometry
 * @three_import import { RollerCoasterShadowGeometry } from 'three/addons/misc/RollerCoaster.js';
 */
export class RollerCoasterShadowGeometry extends BufferGeometry {
    /**
     * Constructs a new geometry.
     *
     * @param {Curve} curve - The curve to generate the geometry along.
     * @param {number} divisions - The number of divisions which defines the detail of the geometry.
     */
    constructor(curve: Curve, divisions: number);
}
/**
 * A procedural sky geometry.
 *
 * @augments BufferGeometry
 * @three_import import { SkyGeometry } from 'three/addons/misc/RollerCoaster.js';
 */
export class SkyGeometry extends BufferGeometry {
}
/**
 * A procedural trees geometry.
 *
 * @augments BufferGeometry
 * @three_import import { TreesGeometry } from 'three/addons/misc/RollerCoaster.js';
 */
export class TreesGeometry extends BufferGeometry {
    /**
     * Constructs a new geometry.
     *
     * @param {Mesh} landscape - A mesh representing the landscape. Trees will be positioned
     * randomly on the landscape's surface.
     */
    constructor(landscape: Mesh);
}
import { BufferGeometry } from 'three';
