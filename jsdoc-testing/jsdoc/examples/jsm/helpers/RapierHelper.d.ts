/**
 * This class displays all Rapier Colliders in outline.
 *
 * @augments LineSegments
 * @three_import import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';
 */
export class RapierHelper extends LineSegments {
    /**
     * Constructs a new Rapier debug helper.
     *
     * @param {RAPIER.world} world - The Rapier world to visualize.
     */
    constructor(world: RAPIER.world);
    /**
     * The Rapier world to visualize.
     *
     * @type {RAPIER.world}
     */
    world: RAPIER.world;
    material: LineBasicMaterial;
    /**
     * Call this in the render loop to update the outlines.
     */
    update(): void;
}
import { LineSegments } from 'three';
import { LineBasicMaterial } from 'three';
