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
export class Bone extends Object3D {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBone: boolean;
    type: string;
}
import { Object3D } from '../core/Object3D.js';
