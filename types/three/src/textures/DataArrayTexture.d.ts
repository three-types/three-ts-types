import { Texture } from './Texture.js';
import { TextureFilter } from '../constants.js';

export class DataArrayTexture extends Texture {
    constructor(data?: BufferSource, width?: number, height?: number, depth?: number);

    /**
     * @default THREE.NearestFilter
     */
    magFilter: TextureFilter;

    /**
     * @default THREE.NearestFilter
     */
    minFilter: TextureFilter;

    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapR: boolean;

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isDataArrayTexture: true;
}
