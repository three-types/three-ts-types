import { InstancedMesh } from "three";
import { LightProbeGrid } from "../lighting/LightProbeGrid.js";

declare class LightProbeGridHelper extends InstancedMesh {
    probes: LightProbeGrid;

    constructor(probes: LightProbeGrid, sphereSize?: number);

    update(): void;
    dispose(): void;
}

export { LightProbeGridHelper };
