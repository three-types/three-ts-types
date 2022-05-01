import { Mesh, Texture, Color } from '../../../src/Three';

export class LensflareElement {
    constructor(texture: Texture, size?: number, distance?: number, color?: Color);
    texture: Texture;
    size: number;
    distance: number;
    color: Color;
}

export interface LensflareElementConstructor {
    new (texture: Texture, size?: number, distance?: number, color?: Color): LensflareElement;
    prototype: LensflareElement;
}

export class Lensflare extends Mesh {
    constructor();
    readonly isLensflare: true;

    addElement(element: LensflareElement): void;
    dispose(): void;
}

export interface LensflareConstructor {
    new (): Lensflare;
    prototype: Lensflare;
}
