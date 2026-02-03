import Binding from "./Binding.js";
/**
 * A bind group represents a collection of bindings and thus a collection
 * or resources. Bind groups are assigned to pipelines to provide them
 * with the required resources (like uniform buffers or textures).
 */
declare class BindGroup {
    name: string;
    bindings: Binding[];
    index: number;
    id: number;
    /**
     * Constructs a new bind group.
     *
     * @param {string} name - The bind group's name.
     * @param {Array<Binding>} bindings - An array of bindings.
     * @param {number} index - The group index.
     */
    constructor(name?: string, bindings?: Binding[], index?: number);
}
export default BindGroup;
