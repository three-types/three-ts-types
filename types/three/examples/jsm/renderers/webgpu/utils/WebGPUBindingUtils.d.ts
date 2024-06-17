import Backend from "../../common/Backend";
import Binding from "../../common/Binding";

export default class WebGPUBindingUtils {
    backend: Backend;

    constructor(backend: Backend);
    createBindingsLayout(bindings: Binding[]);
    createBindings(bindings: Binding[]);
    updateBinding(binding: Binding);
    // createBindGroup(bindings: Binding[], layoutGPU: GPUBindGroupLayout): GPUBindGroup;
}
