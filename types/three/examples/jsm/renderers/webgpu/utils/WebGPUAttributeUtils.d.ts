import { BufferAttribute } from "three";
import Backend from "../../common/Backend";
import RenderObject from "../../common/RenderObject";

export default class WebGPUAttributeUtiils {
    backend: Backend;

    constructor(backend: Backend);
    createAttribute(attribute: BufferAttribute, usage: number);
    updateAttribute(attribute: BufferAttribute);
    // createShaderVertexBuffers(renderObject: RenderObject): GPUVertexBufferLayout[];
    destroyAttribute(attribute: BufferAttribute);
    getArrayBufferAsync(attribute: BufferAttribute): ArrayBuffer;
}
