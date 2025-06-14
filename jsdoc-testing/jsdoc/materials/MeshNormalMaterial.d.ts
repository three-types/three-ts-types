/**
 * A material that maps the normal vectors to RGB colors.
 *
 * @augments Material
 */
export class MeshNormalMaterial extends Material {
    /**
     * Constructs a new mesh normal material.
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
    readonly isMeshNormalMaterial: boolean;
    type: string;
    /**
     * The texture to create a bump map. The black and white values map to the
     * perceived depth in relation to the lights. Bump doesn't actually affect
     * the geometry of the object, only the lighting. If a normal map is defined
     * this will be ignored.
     *
     * @type {?Texture}
     * @default null
     */
    bumpMap: Texture | null;
    /**
     * How much the bump map affects the material. Typical range is `[0,1]`.
     *
     * @type {number}
     * @default 1
     */
    bumpScale: number;
    /**
     * The texture to create a normal map. The RGB values affect the surface
     * normal for each pixel fragment and change the way the color is lit. Normal
     * maps do not change the actual shape of the surface, only the lighting. In
     * case the material has a normal map authored using the left handed
     * convention, the `y` component of `normalScale` should be negated to compensate
     * for the different handedness.
     *
     * @type {?Texture}
     * @default null
     */
    normalMap: Texture | null;
    /**
     * The type of normal map.
     *
     * @type {(TangentSpaceNormalMap|ObjectSpaceNormalMap)}
     * @default TangentSpaceNormalMap
     */
    normalMapType: (number | ObjectSpaceNormalMap);
    /**
     * How much the normal map affects the material. Typical value range is `[0,1]`.
     *
     * @type {Vector2}
     * @default (1,1)
     */
    normalScale: Vector2;
    /**
     * The displacement map affects the position of the mesh's vertices. Unlike
     * other maps which only affect the light and shade of the material the
     * displaced vertices can cast shadows, block other objects, and otherwise
     * act as real geometry. The displacement texture is an image where the value
     * of each pixel (white being the highest) is mapped against, and
     * repositions, the vertices of the mesh.
     *
     * @type {?Texture}
     * @default null
     */
    displacementMap: Texture | null;
    /**
     * How much the displacement map affects the mesh (where black is no
     * displacement, and white is maximum displacement). Without a displacement
     * map set, this value is not applied.
     *
     * @type {number}
     * @default 0
     */
    displacementScale: number;
    /**
     * The offset of the displacement map's values on the mesh's vertices.
     * The bias is added to the scaled sample of the displacement map.
     * Without a displacement map set, this value is not applied.
     *
     * @type {number}
     * @default 0
     */
    displacementBias: number;
    /**
     * Renders the geometry as a wireframe.
     *
     * @type {boolean}
     * @default false
     */
    wireframe: boolean;
    /**
     * Controls the thickness of the wireframe.
     *
     * WebGL and WebGPU ignore this property and always render
     * 1 pixel wide lines.
     *
     * @type {number}
     * @default 1
     */
    wireframeLinewidth: number;
    /**
     * Whether the material is rendered with flat shading or not.
     *
     * @type {boolean}
     * @default false
     */
    flatShading: boolean;
    copy(source: any): this;
}
import { Material } from './Material.js';
import { Vector2 } from '../math/Vector2.js';
