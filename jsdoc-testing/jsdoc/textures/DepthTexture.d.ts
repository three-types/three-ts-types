/**
 * This class can be used to automatically save the depth information of a
 * rendering into a texture.
 *
 * @augments Texture
 */
export class DepthTexture extends Texture {
    /**
     * Constructs a new depth texture.
     *
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {number} [type=UnsignedIntType] - The texture type.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearFilter] - The min filter value.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {number} [format=DepthFormat] - The texture format.
     * @param {number} [depth=1] - The depth of the texture.
     */
    constructor(width: number, height: number, type?: number, mapping?: number, wrapS?: number, wrapT?: number, magFilter?: number, minFilter?: number, anisotropy?: number, format?: number, depth?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDepthTexture: boolean;
    /**
     * Code corresponding to the depth compare function.
     *
     * @type {?(NeverCompare|LessCompare|EqualCompare|LessEqualCompare|GreaterCompare|NotEqualCompare|GreaterEqualCompare|AlwaysCompare)}
     * @default null
     */
    compareFunction: (NeverCompare | LessCompare | EqualCompare | LessEqualCompare | GreaterCompare | NotEqualCompare | GreaterEqualCompare | AlwaysCompare) | null;
    copy(source: any): this;
    toJSON(meta: any): Object;
}
import { Texture } from './Texture.js';
