import { RenderTarget } from "../../../core/RenderTarget";
import { Scene } from "../../../scenes/Scene";
import Renderer from "../Renderer.js";

export default class PMREMGenerator {
    constructor(renderer: Renderer);

    fromScene(scene: Scene, sigma?: number, near?: number, far?: number): RenderTarget;
}
