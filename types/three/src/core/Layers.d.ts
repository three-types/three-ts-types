/**
 * A layers object assigns an 3D object to 1 or more of 32
 * layers numbered `0` to `31` - internally the layers are stored as a
 * bit mask], and by default all 3D objects are a member of layer `0`.
 *
 * This can be used to control visibility - an object must share a layer with
 * a camera to be visible when that camera's view is
 * rendered.
 *
 * All classes that inherit from {@link Object3D} have an `layers` property which
 * is an instance of this class.
 */
export class Layers {
    /**
     * A bit mask storing which of the 32 layers this layers object is currently
     * a member of.
     *
     * @type {number}
     */
    mask: number;
    /**
     * Sets membership to the given layer, and remove membership all other layers.
     *
     * @param {number} layer - The layer to set.
     */
    set(layer: number): void;
    /**
     * Adds membership of the given layer.
     *
     * @param {number} layer - The layer to enable.
     */
    enable(layer: number): void;
    /**
     * Adds membership to all layers.
     */
    enableAll(): void;
    /**
     * Toggles the membership of the given layer.
     *
     * @param {number} layer - The layer to toggle.
     */
    toggle(layer: number): void;
    /**
     * Removes membership of the given layer.
     *
     * @param {number} layer - The layer to enable.
     */
    disable(layer: number): void;
    /**
     * Removes the membership from all layers.
     */
    disableAll(): void;
    /**
     * Returns `true` if this and the given layers object have at least one
     * layer in common.
     *
     * @param {Layers} layers - The layers to test.
     * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
     */
    test(layers: Layers): boolean;
    /**
     * Returns `true` if the given layer is enabled.
     *
     * @param {number} layer - The layer to test.
     * @return {boolean } Whether the given layer is enabled or not.
     */
    isEnabled(layer: number): boolean;
}
