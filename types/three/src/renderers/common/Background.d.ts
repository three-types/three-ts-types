import { Mesh } from "../../objects/Mesh.js";
import { Scene } from "../../scenes/Scene.js";
import DataMap from "./DataMap.js";
import NodeManager from "./nodes/NodeManager.js";
import RenderContext from "./RenderContext.js";
import Renderer from "./Renderer.js";
import RenderList from "./RenderList.js";
interface SceneData {
    backgroundMesh?: Mesh;
    backgroundCacheKey: string;
}
/**
 * This renderer module manages the background.
 */
declare class Background extends DataMap<{
    scene: {
        key: Scene;
        value: SceneData;
    };
}> {
    renderer: Renderer;
    nodes: NodeManager;
    /**
     * Constructs a new background management component.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Nodes} nodes - Renderer component for managing nodes related logic.
     */
    constructor(renderer: Renderer, nodes: NodeManager);
    /**
     * Updates the background for the given scene. Depending on how `Scene.background`
     * or `Scene.backgroundNode` are configured, this method might configure a simple clear
     * or add a mesh to the render list for rendering the background as a textured plane
     * or skybox.
     *
     * @param {Scene} scene - The scene.
     * @param {RenderList} renderList - The current render list.
     * @param {RenderContext} renderContext - The current render context.
     */
    update(scene: Scene, renderList: RenderList, renderContext: RenderContext): void;
}
export default Background;
