import { Material, Mesh, OrthographicCamera } from "three";
import Renderer from "./Renderer.js";

export default class QuadMesh extends Mesh {
    camera: OrthographicCamera;

    constructor(material?: Material | null);

    renderAsync(renderer: Renderer): Promise<void>;

    render(renderer: Renderer): void;
}
