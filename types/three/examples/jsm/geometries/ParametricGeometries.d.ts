import { Curve, Vector3 } from "three";

import { ParametricGeometry } from "./ParametricGeometry.js";

declare class ParametricTubeGeometry extends ParametricGeometry {
    constructor(
        path: Curve<Vector3>,
        segments?: number,
        radius?: number,
        segmentsRadius?: number,
        closed?: boolean,
    );
}

declare class ParametricTorusKnotGeometry extends ParametricTubeGeometry {
    constructor(radius?: number, tube?: number, segmentsT?: number, segmentsR?: number, p?: number, q?: number);
}

declare class ParametricSphereGeometry extends ParametricGeometry {
    constructor(size: number, u: number, v: number);
}

declare class ParametricPlaneGeometry extends ParametricGeometry {
    constructor(width: number, depth: number, segmentsWidth: number, segmentsDepth: number);
}

interface ParametricGeometries {
    klein: (v: number, u: number, target: Vector3) => Vector3;
    plane: (width: number, height: number) => (u: number, v: number, target: Vector3) => Vector3;
    mobius: (u: number, t: number, target: Vector3) => Vector3;
    mobius3d: (u: number, t: number, target: Vector3) => Vector3;
    PlaneGeometry: typeof ParametricPlaneGeometry;
    TorusKnotGeometry: typeof ParametricTorusKnotGeometry;
    TubeGeometry: typeof ParametricTubeGeometry;
    SphereGeometry: typeof ParametricSphereGeometry;
}

declare const ParametricGeometries: ParametricGeometries;

export { ParametricGeometries };
