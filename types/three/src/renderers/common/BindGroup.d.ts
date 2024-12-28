import Binding from "./Binding.js";
import NodeUniformsGroup from "./nodes/NodeUniformsGroup.js";
/**
 * Represents a bind group.
 *
 * @private
 */
declare class BindGroup {
    name: string;
    bindings: NodeUniformsGroup[] | Binding[];
    index: number;
    bindingsReference: NodeUniformsGroup[] | BindGroup;
    id: number;
    /**
     * Constructs a new bind group.
     *
     * @param {String} name - The bind group's name.
     * @param {Array<Binding>} bindings - An array of bindings.
     * @param {Number} index - The group index.
     * @param {Array<Binding>} bindingsReference - An array of reference bindings.
     */
    constructor(
        name?: string,
        bindings?: NodeUniformsGroup[],
        index?: number,
        bindingsReference?: NodeUniformsGroup[] | BindGroup,
    );
}
export default BindGroup;
