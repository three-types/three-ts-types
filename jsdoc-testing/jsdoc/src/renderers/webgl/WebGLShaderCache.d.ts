export class WebGLShaderCache {
    shaderCache: Map<any, any>;
    materialCache: Map<any, any>;
    update(material: any, vertexShaderStage: any, fragmentShaderStage: any): this;
    remove(material: any): this;
    getVertexShaderStage(material: any): any;
    getFragmentShaderStage(material: any): any;
    dispose(): void;
    _getShaderCacheForMaterial(material: any): any;
    _getShaderStage(code: any): any;
}
