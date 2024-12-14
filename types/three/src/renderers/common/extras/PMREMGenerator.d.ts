import { RenderTarget } from "../../../core/RenderTarget.js";
import { Scene } from "../../../scenes/Scene.js";
import Renderer from "../Renderer.js";

declare class PMREMGenerator {
    constructor(renderer: Renderer);

    fromScene(scene: Scene, sigma?: number, near?: number, far?: number): RenderTarget | Promise<RenderTarget>;

    fromSceneAsync(scene: Scene, sigma?: number, near?: number, far?: number): Promise<RenderTarget>;

    dispose(): void;
}

export default PMREMGenerator;
