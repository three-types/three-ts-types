/**
 * A sprite is a plane that always faces towards the camera, generally with a
 * partially transparent texture applied.
 *
 * Sprites do not cast shadows, setting {@link Object3D#castShadow} to `true` will
 * have no effect.
 *
 * ```js
 * const map = new THREE.TextureLoader().load( 'sprite.png' );
 * const material = new THREE.SpriteMaterial( { map: map } );
 *
 * const sprite = new THREE.Sprite( material );
 * scene.add( sprite );
 * ```
 *
 * @augments Object3D
 */
export class Sprite extends Object3D {
    /**
     * Constructs a new sprite.
     *
     * @param {(SpriteMaterial|SpriteNodeMaterial)} [material] - The sprite material.
     */
    constructor(material?: (SpriteMaterial | SpriteNodeMaterial));
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSprite: boolean;
    type: string;
    /**
     * The sprite geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: BufferGeometry;
    /**
     * The sprite material.
     *
     * @type {(SpriteMaterial|SpriteNodeMaterial)}
     */
    material: (SpriteMaterial | SpriteNodeMaterial);
    /**
     * The sprite's anchor point, and the point around which the sprite rotates.
     * A value of `(0.5, 0.5)` corresponds to the midpoint of the sprite. A value
     * of `(0, 0)` corresponds to the lower left corner of the sprite.
     *
     * @type {Vector2}
     * @default (0.5,0.5)
     */
    center: Vector2;
    /**
     * The number of instances of this sprite.
     * Can only be used with {@link WebGPURenderer}.
     *
     * @type {number}
     * @default 1
     */
    count: number;
    /**
     * Computes intersection points between a casted ray and this sprite.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    copy(source: any, recursive: any): this;
}
import { Object3D } from '../core/Object3D.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { SpriteMaterial } from '../materials/SpriteMaterial.js';
import { Vector2 } from '../math/Vector2.js';
