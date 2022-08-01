import Node from '../core/Node';
import { RangeModeBound } from '../geometry/RangeNode';
import { NodeRepresentation, Swizzable } from './ShaderNode';
import {
    CubeTexture,
    InstancedMesh,
    Light,
    SkinnedMesh,
    Texture,
    TextureEncoding,
    ToneMapping,
} from '../../../../src/Three';
import { LightingContextModel } from '../lighting/LightingContextNode';

//
// Node Material Shader Syntax
//

// shader node base

export * from './ShaderNodeBaseElements';

// functions

export { default as BRDF_GGX } from '../functions/BSDF/BRDF_GGX'; // see https://github.com/tc39/proposal-export-default-from
export { default as BRDF_Lambert } from '../functions/BSDF/BRDF_Lambert';
export { default as D_GGX } from '../functions/BSDF/D_GGX';
export { default as DFGApprox } from '../functions/BSDF/DFGApprox';
export { default as F_Schlick } from '../functions/BSDF/F_Schlick';
export { default as V_GGX_SmithCorrelated } from '../functions/BSDF/V_GGX_SmithCorrelated';

export { default as getDistanceAttenuation } from '../functions/light/getDistanceAttenuation';

export { default as getGeometryRoughness } from '../functions/material/getGeometryRoughness';
export { default as getRoughness } from '../functions/material/getRoughness';

export { default as PhysicalLightingModel } from '../functions/PhysicalLightingModel';

// accessors

export function cubeTexture(value: CubeTexture, uvNode?: NodeRepresentation, levelNode?: NodeRepresentation): Swizzable;
export function instance(instanceMesh: InstancedMesh): Swizzable;
export const reflectVector: Swizzable;
export function skinning(skinnedMesh: SkinnedMesh): Swizzable;

// display

export function saturation(colorNode: NodeRepresentation, adjustmentNode?: NodeRepresentation): Swizzable;
export function vibrance(colorNode: NodeRepresentation, adjustmentNode?: NodeRepresentation): Swizzable;
export function hue(colorNode: NodeRepresentation, adjustmentNode?: NodeRepresentation): Swizzable;

export function colorSpace(node: NodeRepresentation, encoding: TextureEncoding): Swizzable;
export function normalMap(node: Node, scaleNode?: Node): Swizzable;
export function toneMapping(mapping: ToneMapping, exposure: NodeRepresentation, color: NodeRepresentation): Swizzable;

// lighting

export function lights(lights: Light[]): Swizzable;
export function lightingContext(node: Node, lightingModelNode?: LightingContextModel): Swizzable;

// utils

export const matcapUV: Swizzable;
export function maxMipLevel(texture: Texture): Swizzable;

export function oscSine(timeNode?: NodeRepresentation): Swizzable;
export function oscSquare(timeNode?: NodeRepresentation): Swizzable;
export function oscTriangle(timeNode?: NodeRepresentation): Swizzable;
export function oscSawtooth(timeNode?: NodeRepresentation): Swizzable;

export function rotateUV(uvNode: Node, rotationNode: Node, centerNode?: Node): Swizzable;

export function spritesheetUV(
    countNode: NodeRepresentation,
    uvNode?: NodeRepresentation,
    frameNode?: NodeRepresentation,
): Swizzable;

export function timerLocal(timeScale: number, value?: number): Swizzable;
export function timerGlobal(timeScale: number, value?: number): Swizzable;
export function timerDelta(timeScale: number, value?: number): Swizzable;

// geometry

export function range(min: RangeModeBound, max: RangeModeBound): Swizzable;

// procedural

export function checker(uvNode?: NodeRepresentation): Swizzable;

// fog

export function fog(colorNode: NodeRepresentation, factorNode: NodeRepresentation): Swizzable;
export function rangeFog(colorNode: Node, nearNode: Node, farNode: Node): Swizzable;
