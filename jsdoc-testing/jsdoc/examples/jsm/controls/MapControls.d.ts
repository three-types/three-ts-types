/**
 * This class is intended for transforming a camera over a map from bird's eye perspective.
 * The class shares its implementation with {@link OrbitControls} but uses a specific preset
 * for mouse/touch interaction and disables screen space panning by default.
 *
 * - Orbit: Right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate.
 * - Zoom: Middle mouse, or mousewheel / touch: two-finger spread or squish.
 * - Pan: Left mouse, or arrow keys / touch: one-finger move.
 *
 * @augments OrbitControls
 * @three_import import { MapControls } from 'three/addons/controls/MapControls.js';
 */
export class MapControls extends OrbitControls {
    constructor(object: any, domElement: any);
    _panWorldStart: Vector3;
}
import { OrbitControls } from './OrbitControls.js';
import { Vector3 } from 'three';
