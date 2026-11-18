import { Camera } from "../../cameras/Camera.js";
import { BufferGeometry } from "../../core/BufferGeometry.js";
import { Object3D } from "../../core/Object3D.js";
import { Light } from "../../lights/Light.js";
import { LightShadow } from "../../lights/LightShadow.js";
import { Material } from "../../materials/Material.js";
import NodeMaterial from "../../materials/nodes/NodeMaterial.js";
import { Group } from "../../objects/Group.js";
import ClippingContext from "../../renderers/common/ClippingContext.js";
import Renderer from "../../renderers/common/Renderer.js";
import { Scene } from "../../scenes/Scene.js";
import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import NodeFrame from "../core/NodeFrame.js";
import LightsNode from "./LightsNode.js";

declare class ShadowBaseNode extends Node {
    light: Light;
    shadow: LightShadow;

    readonly isShadowBasedNode: true;

    constructor(light: Light, shadow?: LightShadow);

    getShadowMaterial(): NodeMaterial;

    disposeShadowMaterial(): void;

    getShadowRenderObjectFunction(
        renderer: Renderer,
        shadow?: LightShadow,
    ): (
        object: Object3D,
        scene: Scene,
        _camera: Camera,
        geometry: BufferGeometry,
        material: Material,
        group: Group,
        lightsNode: LightsNode,
        clippingContext?: ClippingContext | null,
        passId?: string | null,
    ) => void;

    setupShadowPosition(builder: NodeBuilder): void;

    /**
     * Updates the shadow. Must be implemented by subclasses.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateShadow(frame: NodeFrame): void;

    /**
     * Returns `true` if the shadow map must be rendered for the given frame. The shadow
     * map is rendered once per camera and frame. Renders nested in the one that has
     * updated the shadow map in the current frame share it.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {boolean} Whether the shadow map must be rendered.
     */
    needsRefresh(frame: NodeFrame): boolean;
}

export const shadowPositionWorld: Node;

export default ShadowBaseNode;
