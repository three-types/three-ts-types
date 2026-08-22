/**
 * @module UVsDebug
 * @three_import import { UVsDebug } from 'three/addons/utils/UVsDebug.js';
 */
/**
 * Function for "unwrapping" and debugging three.js geometries UV mapping.
 *
 * ```js
 * document.body.appendChild( UVsDebug( new THREE.SphereGeometry() ) );
 * ```
 *
 * @param {BufferGeometry} geometry - The geometry whose uv coordinates should be inspected.
 * @param {number} [size=1024] - The size of the debug canvas.
 * @return {HTMLCanvasElement} A canvas element with visualized uv coordinates.
 */
export function UVsDebug(geometry: BufferGeometry, size?: number): HTMLCanvasElement;
