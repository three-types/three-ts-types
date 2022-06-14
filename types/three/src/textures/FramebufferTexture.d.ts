import { Dimensions2D, Texture } from './Texture';
import { PixelFormat } from '../constants';

export class FramebufferTexture extends Texture<Dimensions2D> {
    readonly isFramebufferTexture: true;

    constructor(width: number, height: number, format: PixelFormat);
}
