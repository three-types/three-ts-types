/**
 * Creates a cube texture made up of six images.
 *
 * ```js
 * const loader = new THREE.CubeTextureLoader();
 * loader.setPath( 'textures/cube/pisa/' );
 *
 * const textureCube = loader.load( [
 * 	'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
 * ] );
 *
 * const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
 * ```
 *
 * @augments Texture
 */
export class CubeTexture extends Texture {
    /**
     * Constructs a new cube texture.
     *
     * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
     * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {string} [colorSpace=NoColorSpace] - The color space value.
     */
    constructor(images?: Array<new (width?: number, height?: number) => HTMLImageElement>, mapping?: number, wrapS?: number, wrapT?: number, magFilter?: number, minFilter?: number, format?: number, type?: number, anisotropy?: number, colorSpace?: string);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTexture: boolean;
    set images(value: Array<new (width?: number, height?: number) => HTMLImageElement>);
    /**
     * Alias for {@link CubeTexture#image}.
     *
     * @type {Array<Image>}
     */
    get images(): Array<new (width?: number, height?: number) => HTMLImageElement>;
}
import { Texture } from './Texture.js';
