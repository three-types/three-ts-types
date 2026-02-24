/**
 * A material for rendering instances of {@link Sprite}.
 *
 * ```js
 * const map = new THREE.TextureLoader().load( 'textures/sprite.png' );
 * const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
 *
 * const sprite = new THREE.Sprite( material );
 * sprite.scale.set(200, 200, 1)
 * scene.add( sprite );
 * ```
 *
 * @augments Material
 */
export class SpriteMaterial extends Material {
    /**
     * Constructs a new sprite material.
     *
     * @param {Object} [parameters] - An object with one or more properties
     * defining the material's appearance. Any property of the material
     * (including any property from inherited materials) can be passed
     * in here. Color values can be passed any type of value accepted
     * by {@link Color#set}.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSpriteMaterial: boolean;
    type: string;
    /**
     * Color of the material.
     *
     * @type {Color}
     * @default (1,1,1)
     */
    color: Color;
    /**
     * The color map. May optionally include an alpha channel, typically combined
     * with {@link Material#transparent} or {@link Material#alphaTest}. The texture map
     * color is modulated by the diffuse `color`.
     *
     * @type {?Texture}
     * @default null
     */
    map: Texture | null;
    /**
     * The alpha map is a grayscale texture that controls the opacity across the
     * surface (black: fully transparent; white: fully opaque).
     *
     * Only the color of the texture is used, ignoring the alpha channel if one
     * exists. For RGB and RGBA textures, the renderer will use the green channel
     * when sampling this texture due to the extra bit of precision provided for
     * green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and
     * luminance/alpha textures will also still work as expected.
     *
     * @type {?Texture}
     * @default null
     */
    alphaMap: Texture | null;
    /**
     * The rotation of the sprite in radians.
     *
     * @type {number}
     * @default 0
     */
    rotation: number;
    /**
     * Specifies whether size of the sprite is attenuated by the camera depth (perspective camera only).
     *
     * @type {boolean}
     * @default true
     */
    sizeAttenuation: boolean;
    /**
     * Whether the material is affected by fog or not.
     *
     * @type {boolean}
     * @default true
     */
    fog: boolean;
    copy(source: any): this;
}
import { Material } from './Material.js';
import { Color } from '../math/Color.js';
