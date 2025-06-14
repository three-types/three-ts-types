export default UniformNode;
export function uniform(arg1: any, arg2?: string): UniformNode;
/**
 * Class for representing a uniform.
 *
 * @augments InputNode
 */
declare class UniformNode extends InputNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformNode: boolean;
    /**
     * The name or label of the uniform.
     *
     * @type {string}
     * @default ''
     */
    name: string;
    /**
     * The uniform group of this uniform. By default, uniforms are
     * managed per object but they might belong to a shared group
     * which is updated per frame or render call.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
    /**
     * Sets the {@link UniformNode#name} property.
     *
     * @param {string} name - The name of the uniform.
     * @return {UniformNode} A reference to this node.
     */
    label(name: string): UniformNode;
    /**
     * Sets the {@link UniformNode#groupNode} property.
     *
     * @param {UniformGroupNode} group - The uniform group.
     * @return {UniformNode} A reference to this node.
     */
    setGroup(group: UniformGroupNode): UniformNode;
    /**
     * Returns the {@link UniformNode#groupNode}.
     *
     * @return {UniformGroupNode} The uniform group.
     */
    getGroup(): UniformGroupNode;
    /**
     * By default, this method returns the result of {@link Node#getHash} but derived
     * classes might overwrite this method with a different implementation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The uniform hash.
     */
    getUniformHash(builder: NodeBuilder): string;
    onUpdate(callback: any, updateType: any): import("./Node.js").default;
    generate(builder: any, output: any): any;
}
import InputNode from './InputNode.js';
