/**
 * @module Text2D
 * @three_import import * as Text2D from 'three/addons/webxr/Text2D.js';
 */
/**
 * A helper function for creating a simple plane mesh
 * that can be used as a text label. The mesh's material
 * holds a canvas texture that displays the given message.
 *
 * @param {string} message - The message to display.
 * @param {number} height - The labels height.
 * @return {Mesh} The plane mesh representing a text label.
 */
export function createText(message: string, height: number): Mesh;
import { Mesh } from 'three';
