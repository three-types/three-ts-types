export class WebGLProperties {
    constructor();

    get(object: any): any;
    remove(object: any): void;
    update(object: any, key: any, value: any): any;
    dispose(): void;
}

export interface WebGLPropertiesConstructor {
    new (): WebGLProperties;
    prototype: WebGLProperties;
}
