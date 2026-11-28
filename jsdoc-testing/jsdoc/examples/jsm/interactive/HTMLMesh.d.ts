/**
 * This class can be used to render a DOM element onto a canvas and use it as a texture
 * for a plane mesh.
 *
 * A typical use case for this class is to render the GUI of `lil-gui` as a texture so it
 * is compatible for VR.
 *
 * ```js
 * const gui = new GUI( { width: 300 } ); // create lil-gui instance
 *
 * const mesh = new HTMLMesh( gui.domElement );
 * scene.add( mesh );
 * ```
 *
 * @augments Mesh
 * @three_import import { HTMLMesh } from 'three/addons/interactive/HTMLMesh.js';
 */
export class HTMLMesh extends Mesh {
    /**
     * Constructs a new HTML mesh.
     *
     * @param {HTMLElement} dom - The DOM element to display as a plane mesh.
     */
    constructor(dom: HTMLElement);
    /**
     * Forwards the mesh's pointer events to the DOM element.
     *
     * @private
     * @type {Function}
     */
    private _onEvent;
}
import { Mesh } from 'three';
