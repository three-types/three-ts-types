import { AnalyticLightNode } from "three/webgpu";
import { LightProbeGrid } from "../../lighting/LightProbeGrid.js";

export const ATLAS_PADDING: number;

export class LightProbeGridNode extends AnalyticLightNode<LightProbeGrid> {
    constructor(light?: LightProbeGrid | null);
}
