import { Camera } from "../../cameras/Camera.js";
import { BufferGeometry } from "../../core/BufferGeometry.js";
import { Object3D } from "../../core/Object3D.js";
import { Material } from "../../materials/Material.js";
import Renderer from "../../renderers/common/Renderer.js";
import RenderPipeline from "../../renderers/common/RenderPipeline.js";
import { Scene } from "../../scenes/Scene.js";
import TextureNode from "../accessors/TextureNode.js";
import ComputeNode from "../gpgpu/ComputeNode.js";
import Node from "./Node.js";

export default abstract class NodeBuilder {
    object: Object3D;
    material: Material | null;
    geometry: BufferGeometry | null;
    scene: Scene | null;

    /**
     * The camera the 3D object is rendered with.
     */
    camera: Camera | null;

    /**
     * The compute node, if building for compute.
     */
    compute: ComputeNode | null;

    renderer: Renderer;
    context: unknown;

    /**
     * A reference to the render pipeline.
     */
    readonly renderPipeline: RenderPipeline;

    /**
     * Returns the parameters that pass a texture to a function: the texture node, and the nodes
     * the backend needs to sample it, e.g. its sampler. The parameters are passed in this order,
     * with the given names in the code of the function.
     *
     * @param {string} name - The name of the texture parameter.
     * @param {TextureNode} textureNode - The texture node.
     * @return {Object<string,Node>} The nodes of the parameters, by name.
     */
    getTextureParameters(name: string, textureNode: TextureNode): Record<string, Node>;
}
