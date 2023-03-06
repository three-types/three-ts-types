import { Texture } from './Texture';
import { MagnificationTextureFilter, MinificationTextureFilter, Wrapping } from '../constants';

export class Data3DTexture extends Texture {
    constructor(data: BufferSource, width: number, height: number, depth: number);

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
    wrapR: Wrapping;

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isData3DTexture: true;
}
