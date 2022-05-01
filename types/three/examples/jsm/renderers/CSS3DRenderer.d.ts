import { Object3D, Scene, Camera } from '../../../src/Three';

export class CSS3DObject extends Object3D {
    constructor(element: HTMLElement);
    element: HTMLElement;

    onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
    onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
}

export interface CSS3DObjectConstructor {
    new (element: HTMLElement): CSS3DObject;
    prototype: CSS3DObject;
}

export class CSS3DSprite extends CSS3DObject {
    constructor(element: HTMLElement);
}

export interface CSS3DSpriteConstructor {
    new (element: HTMLElement): CSS3DSprite;
    prototype: CSS3DSprite;
}

export type CSS3DParameters = {
    element?: HTMLElement;
};

export class CSS3DRenderer {
    constructor(parameters?: CSS3DParameters);
    domElement: HTMLElement;

    getSize(): { width: number; height: number };
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
}

export interface CSS3DRendererConstructor {
    new (parameters?: CSS3DParameters): CSS3DRenderer;
    prototype: CSS3DRenderer;
}
