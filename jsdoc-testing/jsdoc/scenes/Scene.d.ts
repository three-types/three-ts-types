/**
 * Scenes allow you to set up what is to be rendered and where by three.js.
 * This is where you place 3D objects like meshes, lines or lights.
 *
 * @augments Object3D
 */
export class Scene extends Object3D {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isScene: boolean;
    type: string;
    /**
     * Defines the background of the scene. Valid inputs are:
     *
     * - A color for defining a uniform colored background.
     * - A texture for defining a (flat) textured background.
     * - Cube textures or equirectangular textures for defining a skybox.
     *
     * @type {?(Color|Texture)}
     * @default null
     */
    background: (Color | Texture) | null;
    /**
     * Sets the environment map for all physical materials in the scene. However,
     * it's not possible to overwrite an existing texture assigned to the `envMap`
     * material property.
     *
     * @type {?Texture}
     * @default null
     */
    environment: Texture | null;
    /**
     * A fog instance defining the type of fog that affects everything
     * rendered in the scene.
     *
     * @type {?(Fog|FogExp2)}
     * @default null
     */
    fog: (Fog | FogExp2) | null;
    /**
     * Sets the blurriness of the background. Only influences environment maps
     * assigned to {@link Scene#background}. Valid input is a float between `0`
     * and `1`.
     *
     * @type {number}
     * @default 0
     */
    backgroundBlurriness: number;
    /**
     * Attenuates the color of the background. Only applies to background textures.
     *
     * @type {number}
     * @default 1
     */
    backgroundIntensity: number;
    /**
     * The rotation of the background in radians. Only influences environment maps
     * assigned to {@link Scene#background}.
     *
     * @type {Euler}
     * @default (0,0,0)
     */
    backgroundRotation: Euler;
    /**
     * Attenuates the color of the environment. Only influences environment maps
     * assigned to {@link Scene#environment}.
     *
     * @type {number}
     * @default 1
     */
    environmentIntensity: number;
    /**
     * The rotation of the environment map in radians. Only influences physical materials
     * in the scene when {@link Scene#environment} is used.
     *
     * @type {Euler}
     * @default (0,0,0)
     */
    environmentRotation: Euler;
    /**
     * Forces everything in the scene to be rendered with the defined material. It is possible
     * to exclude materials from override by setting {@link Material#allowOverride} to `false`.
     *
     * @type {?Material}
     * @default null
     */
    overrideMaterial: Material | null;
    copy(source: any, recursive: any): this;
    toJSON(meta: any): Object;
}
import { Object3D } from '../core/Object3D.js';
import { Euler } from '../math/Euler.js';
