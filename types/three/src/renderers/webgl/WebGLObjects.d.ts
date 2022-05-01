export class WebGLObjects {
    constructor(gl: WebGLRenderingContext, geometries: any, attributes: any, info: any);

    update(object: any): any;
    dispose(): void;
}

export interface WebGLObjectsConstructor {
    new (gl: WebGLRenderingContext, geometries: any, attributes: any, info: any): WebGLObjects;
    prototype: WebGLObjects;
}
