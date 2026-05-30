export default SkinningNode;
export function skinning(skinnedMesh: SkinnedMesh): SkinningNode;
export function computeSkinning(skinnedMesh: SkinnedMesh, toPosition?: Node<vec3>): SkinningNode;
/**
 * This node implements the vertex transformation shader logic which is required
 * for skinning/skeletal animation.
 *
 * @augments Node
 */
declare class SkinningNode extends Node {
    /**
     * Constructs a new skinning node.
     *
     * @param {SkinnedMesh} skinnedMesh - The skinned mesh.
     */
    constructor(skinnedMesh: SkinnedMesh);
    /**
     * The skinned mesh.
     *
     * @type {SkinnedMesh}
     */
    skinnedMesh: SkinnedMesh;
    /**
     * The skin index attribute.
     *
     * @type {AttributeNode}
     */
    skinIndexNode: AttributeNode;
    /**
     * The skin weight attribute.
     *
     * @type {AttributeNode}
     */
    skinWeightNode: AttributeNode;
    /**
     * The bind matrix node.
     *
     * @type {Node<mat4>}
     */
    bindMatrixNode: Node<mat4>;
    /**
     * The bind matrix inverse node.
     *
     * @type {Node<mat4>}
     */
    bindMatrixInverseNode: Node<mat4>;
    /**
     * The bind matrices as a uniform buffer node.
     *
     * @type {Node}
     */
    boneMatricesNode: Node;
    /**
     * The current vertex position in local space.
     *
     * @type {Node<vec3>}
     */
    positionNode: Node<vec3>;
    /**
     * The result of vertex position in local space.
     *
     * @type {Node<vec3>}
     */
    toPositionNode: Node<vec3>;
    /**
     * The previous bind matrices as a uniform buffer node.
     * Required for computing motion vectors.
     *
     * @type {?Node}
     * @default null
     */
    previousBoneMatricesNode: Node | null;
    /**
     * Transforms the given vertex position via skinning.
     *
     * @param {Node} [boneMatrices=this.boneMatricesNode] - The bone matrices
     * @param {Node<vec3>} [position=this.positionNode] - The vertex position in local space.
     * @return {Node<vec3>} The transformed vertex position.
     */
    getSkinnedPosition(boneMatrices?: Node, position?: Node<vec3>): Node<vec3>;
    /**
     * Transforms the given vertex normal and tangent via skinning.
     *
     * @param {Node} [boneMatrices=this.boneMatricesNode] - The bone matrices
     * @param {Node<vec3>} [normal=normalLocal] - The vertex normal in local space.
     * @param {Node<vec3>} [tangent=tangentLocal] - The vertex tangent in local space.
     * @return {{skinNormal: Node<vec3>, skinTangent:Node<vec3>}} The transformed vertex normal and tangent.
     */
    getSkinnedNormalAndTangent(boneMatrices?: Node, normal?: Node<vec3>, tangent?: Node<vec3>): {
        skinNormal: Node<vec3>;
        skinTangent: Node<vec3>;
    };
    /**
     * Computes the transformed/skinned vertex position of the previous frame.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The skinned position from the previous frame.
     */
    getPreviousSkinnedPosition(builder: NodeBuilder): Node<vec3>;
    /**
     * Setups the skinning node by assigning the transformed vertex data to predefined node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The transformed vertex position.
     */
    setup(builder: NodeBuilder): Node<vec3>;
    /**
     * Generates the code snippet of the skinning node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} output - The current output.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder, output: string): string;
    /**
     * Updates the state of the skinned mesh by updating the skeleton once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(frame: NodeFrame): void;
}
import Node from '../core/Node.js';
