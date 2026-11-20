import { Object3D, Object3DEventMap } from "../core/Object3D.js";

/**
 * A bone which is part of a {@link Skeleton}. The skeleton in turn is used by
 * the {@link SkinnedMesh}.
 *
 * ```js
 * const root = new THREE.Bone();
 * const child = new THREE.Bone();
 *
 * root.add( child );
 * child.position.y = 5;
 * ```
 *
 * @augments Object3D
 */
export class Bone<TEventMap extends Object3DEventMap = Object3DEventMap> extends Object3D<TEventMap> {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBone: true;
}
