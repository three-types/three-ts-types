import { RendererInspector } from "./RendererInspector.js";

declare class Inspector extends RendererInspector {
    createParameters(name: string);
}

export { Inspector };
