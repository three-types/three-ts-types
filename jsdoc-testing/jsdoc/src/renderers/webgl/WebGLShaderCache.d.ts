export class WebGLShaderCache {
    shaderCache: Map<any, any>;
    materialCache: Map<any, any>;
    update(material: any): this;
    remove(material: any): this;
    getVertexShaderID(material: any): any;
    getFragmentShaderID(material: any): any;
    dispose(): void;
    _getShaderCacheForMaterial(material: any): any;
    _getShaderStage(code: any): any;
}
