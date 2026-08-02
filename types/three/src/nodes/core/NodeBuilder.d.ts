import { BufferGeometry } from "../../core/BufferGeometry.js";
import { Object3D } from "../../core/Object3D.js";
import { Material } from "../../materials/Material.js";
import Renderer from "../../renderers/common/Renderer.js";
import RenderPipeline from "../../renderers/common/RenderPipeline.js";

export default abstract class NodeBuilder {
    object: Object3D;
    material: Material;
    geometry: BufferGeometry;
    renderer: Renderer;
    context: unknown;

    /**
     * A reference to the render pipeline.
     */
    readonly renderPipeline: RenderPipeline;
}
