/**
 * Retained for API compatibility. There are no persistent resources to release.
 */
export function dispose(): void;
/**
 * Generates MikkTSpace tangents for unindexed triangles using the default
 * 180-degree angular threshold. Normals are expected to be normalized and all
 * input components finite. Extreme values may overflow float32 intermediates,
 * as in the reference implementation. Input attributes are not modified.
 *
 * @param {Float32Array} position - Triangle vertex positions, three components per vertex.
 * @param {Float32Array} normal - Vertex normals, three components per vertex.
 * @param {Float32Array} texcoord - Texture coordinates, two components per vertex.
 * @return {Float32Array} Tangents with four components per vertex: XYZ and handedness.
 */
export function generateTangents(position: Float32Array, normal: Float32Array, texcoord: Float32Array): Float32Array;
/*!
 * Copyright (C) 2011 by Morten S. Mikkelsen
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */
export const isReady: true;
export const ready: Promise<void>;
