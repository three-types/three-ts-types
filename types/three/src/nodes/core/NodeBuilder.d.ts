import { Camera } from "../../cameras/Camera.js";
import { BufferGeometry } from "../../core/BufferGeometry.js";
import { Object3D } from "../../core/Object3D.js";
import { Material } from "../../materials/Material.js";
import Renderer from "../../renderers/common/Renderer.js";
import RenderPipeline from "../../renderers/common/RenderPipeline.js";
import { Scene } from "../../scenes/Scene.js";
import ComputeNode from "../gpgpu/ComputeNode.js";

export default abstract class NodeBuilder {
    object: Object3D;
    material: Material | null;
    geometry: BufferGeometry | null;
    camera: Camera | null;
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
}
