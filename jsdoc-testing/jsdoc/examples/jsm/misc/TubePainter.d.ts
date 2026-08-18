/**
 * @classdesc This module can be used to paint tube-like meshes
 * along a sequence of points. This module is used in a XR
 * painter demo.
 *
 * ```js
 * const painter = new TubePainter();
 * scene.add( painter.mesh );
 * ```
 *
 * @name TubePainter
 * @class
 * @three_import import { TubePainter } from 'three/addons/misc/TubePainter.js';
 */
export function TubePainter(): {
    /**
     * The "painted" tube mesh. Must be added to the scene.
     *
     * @name TubePainter#mesh
     * @type {Mesh}
     */
    mesh: Mesh;
    /**
     * Moves the current painting position to the given value.
     *
     * @method
     * @name TubePainter#moveTo
     * @param {Vector3} position The new painting position.
     */
    moveTo: (position: any) => void;
    /**
     * Draw a stroke from the current position to the given one.
     * This method extends the tube while drawing with the XR
     * controllers.
     *
     * @method
     * @name TubePainter#lineTo
     * @param {Vector3} position The destination position.
     */
    lineTo: (position: any) => void;
    /**
     * Sets the size of newly rendered tube segments.
     *
     * @method
     * @name TubePainter#setSize
     * @param {number} size The size.
     */
    setSize: (value: any) => void;
    /**
     * Sets the color of newly rendered tube segments.
     *
     * @method
     * @name TubePainter#setColor
     * @param {Color} color The color.
     */
    setColor: (value: any) => void;
    /**
     * Updates the internal geometry buffers so the new painted
     * segments are rendered.
     *
     * @method
     * @name TubePainter#update
     */
    update: () => void;
};
export class TubePainter {
}
import { Mesh } from 'three';
