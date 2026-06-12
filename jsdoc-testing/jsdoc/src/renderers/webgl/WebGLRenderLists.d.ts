export function WebGLRenderLists(): {
    get: (scene: any, renderCallDepth: any) => any;
    dispose: () => void;
};
export function WebGLRenderList(): {
    opaque: any[];
    transmissive: any[];
    transparent: any[];
    init: () => void;
    push: (object: any, geometry: any, material: any, groupOrder: any, z: any, group: any) => void;
    unshift: (object: any, geometry: any, material: any, groupOrder: any, z: any, group: any) => void;
    finish: () => void;
    sort: (customOpaqueSort: any, customTransparentSort: any, reversedDepth: any) => void;
};
