import { Texture } from './Texture';
import { PixelFormat } from '../constants';

export class FramebufferTexture extends Texture {
    readonly isFramebufferTexture: true;

    constructor(width: number, height: number, format: PixelFormat);
}

export interface FramebufferTextureConstructor {
    new (width: number, height: number, format: PixelFormat): FramebufferTexture;
    prototype: FramebufferTexture;
}
