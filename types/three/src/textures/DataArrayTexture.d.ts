import { Texture } from './Texture';
import { MagnificationTextureFilter, MinificationTextureFilter } from '../constants';

export class DataArrayTexture extends Texture {
    constructor(data?: BufferSource, width?: number, height?: number, depth?: number);

    /**
     * @default THREE.NearestFilter
     */
    magFilter: MagnificationTextureFilter;

    /**
     * @default THREE.NearestFilter
     */
    minFilter: MinificationTextureFilter;

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
