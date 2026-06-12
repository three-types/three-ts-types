export function WebGLBackground(renderer: any, environments: any, state: any, objects: any, alpha: any, premultipliedAlpha: any): {
    getClearColor: () => Color;
    setClearColor: (color: any, alpha?: number) => void;
    getClearAlpha: () => number;
    setClearAlpha: (alpha: any) => void;
    render: (scene: any) => void;
    addToRenderList: (renderList: any, scene: any) => void;
    dispose: () => void;
};
import { Color } from '../../math/Color.js';
