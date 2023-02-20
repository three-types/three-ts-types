import { Texture } from './Texture.js';
import { PixelFormat } from '../constants.js';

export class FramebufferTexture extends Texture {
    readonly isFramebufferTexture: true;

    constructor(width: number, height: number, format: PixelFormat);
}
