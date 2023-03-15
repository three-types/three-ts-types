import { OffscreenCanvas, Texture } from './Texture';
import { Mapping, Wrapping, TextureFilter, PixelFormat, TextureDataType } from '../constants';

/**
 * Creates a texture from a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas | canvas element}.
 * @remarks
 * This is almost the same as the base {@link Texture | Texture} class,
 * except that it sets {@link Texture.needsUpdate | needsUpdate} to `true` immediately.
 * @see {@link THREE.Texture | Texture}
 * @see {@link https://threejs.org/docs/index.html#api/en/Textures/CanvasTexture | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/Textures/CanvasTexture.js | Source}
 */
export class CanvasTexture extends Texture {
    /**
     * This creates a new {@link THREE.CanvasTexture | CanvasTexture} object.
     * @param canvas The HTML canvas element from which to load the texture.
     * @param mapping See {@link Texture.mapping | .mapping}. Default {@link THREE.Texture.DEFAULT_MAPPING}
     * @param wrapS See {@link Texture.wrapS | .wrapS}. Default {@link THREE.ClampToEdgeWrapping}
     * @param wrapT See {@link Texture.wrapT | .wrapT}. Default {@link THREE.ClampToEdgeWrapping}
     * @param magFilter See {@link Texture.magFilter | .magFilter}. Default {@link THREE.LinearFilter}
     * @param minFilter  See {@link Texture.minFilter | .minFilter}. Default {@link THREE.LinearMipmapLinearFilter}
     * @param format See {@link Texture.format | .format}. Default {@link THREE.RGBAFormat}
     * @param type See {@link Texture.type | .type}. Default {@link THREE.UnsignedByteType}
     * @param anisotropy See {@link Texture.anisotropy | .anisotropy}. Default {@link THREE.Texture.DEFAULT_ANISOTROPY}
     * @param encoding See {@link Texture.encoding | .encoding}. Default {@link THREE.LinearEncoding}
     */
    constructor(
        canvas: TexImageSource | OffscreenCanvas,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
    );

    /**
     * Read-only flag to check if a given object is of type {@link CanvasTexture}.
     * @remarks This is a _constant_ value
     * @defaultValue `true`
     */
    readonly isCanvasTexture: true;
}
