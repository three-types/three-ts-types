import { Mesh } from "../../objects/Mesh.js";
import { RawTexture } from "../../textures/RawTexture.js";
import { WebXRArrayCamera } from "./WebXRManager.js";

export class WebXRDepthSensing {
    texture: RawTexture | null;
    mesh: Mesh | null;

    depthNear: number;
    depthFar: number;

    constructor();

    init(depthData: XRWebGLDepthInformation, renderState: XRRenderState): void;

    getMesh(cameraXR: WebXRArrayCamera): Mesh | null;

    reset(): void;

    getDepthTexture(): RawTexture | null;
}
