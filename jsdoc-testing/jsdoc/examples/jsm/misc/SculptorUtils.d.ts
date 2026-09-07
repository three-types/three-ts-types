/*!
 * Portions adapted from SculptGL by Stéphane Ginier.
 * Copyright (c) 2019 Stéphane GINIER
 * Licensed under the MIT License; see ./SculptGL.LICENSE.txt.
 */
export const TRI_INDEX: 4294967295;
export const MAX_FLAG: 2147483647;
export function getMemory(byteLength: any): ArrayBuffer;
export function replaceElement(array: any, oldValue: any, newValue: any): void;
export function removeElement(array: any, value: any): void;
export function tidy(array: any): void;
export function sqrDist(a: any, b: any): number;
export function intersectionRayTriangle(orig: any, dir: any, v1: any, v2: any, v3: any, vertInter: any): number;
export function triangleInsideSphere(point: any, radiusSquared: any, v1: any, v2: any, v3: any): boolean;
export function falloff(dist: any): number;
