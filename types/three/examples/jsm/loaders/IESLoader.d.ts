import { Loader, Texture } from 'three';

export class IESLoader extends Loader {
    parse(text: string): Texture;
}
