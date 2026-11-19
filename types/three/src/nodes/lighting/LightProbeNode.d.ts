import { LightProbe } from "../../lights/LightProbe.js";
import AnalyticLightNode from "./AnalyticLightNode.js";

/**
 * @deprecated since r188.
 */
declare class LightProbeNode extends AnalyticLightNode<LightProbe> {
    /**
     * @deprecated since r188.
     */
    constructor(light?: LightProbe | null);
}

export default LightProbeNode;
