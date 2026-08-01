export function WebGLGeometries(gl: any, attributes: any, info: any, bindingStates: any): {
    get: (object: any, geometry: any) => any;
    update: (geometry: any) => void;
    getWireframeAttribute: (geometry: any) => any;
};
