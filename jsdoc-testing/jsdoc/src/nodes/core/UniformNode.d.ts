export default UniformNode;
export function uniform(value: any | string, type?: string): UniformNode;
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
    setName(name: string): UniformNode;
    /**
     * Sets the {@link UniformNode#name} property.
     *
     * @deprecated
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
    /**
     * Uniform nodes with the same hash share a single uniform. This method returns the node
     * the shared uniform refers to which is the first node registered for the hash.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {UniformNode} The node the shared uniform refers to.
     */
    getSharedNode(builder: NodeBuilder): UniformNode;
    onUpdate(callback: any, updateType: any): import("./Node.js").default;
    getInputType(builder: any): string;
    generate(builder: any, output: any): any;
}
import InputNode from './InputNode.js';
