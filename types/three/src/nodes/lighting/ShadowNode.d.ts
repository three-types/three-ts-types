import { Light } from "../../lights/Light.js";
import { LightShadow } from "../../lights/LightShadow.js";
import NodeFrame from "../core/NodeFrame.js";
import ShadowBaseNode from "./ShadowBaseNode.js";

declare class ShadowNode extends ShadowBaseNode {
    constructor(light: Light, shadow: LightShadow | null);

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

export default ShadowNode;

export const shadow: (light: Light, shadow?: LightShadow) => ShadowNode;
