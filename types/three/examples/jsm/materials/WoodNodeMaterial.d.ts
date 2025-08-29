import * as THREE from "three/webgpu";

export type WoodGenus =
    | "teak"
    | "walnut"
    | "white_oak"
    | "pine"
    | "poplar"
    | "maple"
    | "red_oak"
    | "cherry"
    | "cedar"
    | "mahogany";
export type WoodFinish = "raw" | "matte" | "semigloss" | "gloss";

export const WoodGenuses: WoodGenus[];
export const Finishes: WoodFinish[];

export interface WoodParameters {
    grainPosition: THREE.Vector3;
    grainRotation: THREE.Vector3;
    centerSize: number;
    largeWarpScale: number;
    largeGrainStretch: number;
    smallWarpStrength: number;
    smallWarpScale: number;
    fineWarpStrength: number;
    fineWarpScale: number;
    ringCount: number;
    ringBias: number;
    ringSizeVariance: number;
    ringVarianceScale: number;
    barkThickness: number;
    splotchScale: number;
    splotchIntensity: number;
    cellScale: number;
    cellSize: number;
    darkGrainColor: string | THREE.Color;
    lightGrainColor: string | THREE.Color;
    genus: WoodGenus;
    finish: WoodFinish;
    clearcoat: number;
    clearcoatRoughness: number;
    clearcoatDarken: number;
}

export function GetWoodPreset(genus: WoodGenus, finish: WoodFinish): WoodParameters;

export class WoodNodeMaterial extends THREE.MeshPhysicalNodeMaterial {
    readonly isWoodNodeMaterial: true;

    constructor(params?: Partial<WoodParameters>);

    static fromPreset(genus?: WoodGenus, finish?: WoodFinish): WoodNodeMaterial;
}
