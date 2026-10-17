/**
 * Module.js - Base class for LUT 3D Generator Card Modules
 */
export class Module {
    constructor(id: any, name: any, params?: {});
    id: any;
    name: any;
    params: {};
    enabled: boolean;
    domElement: any;
    onChange: any;
    dragAndDrop: boolean;
    /**
     * Applies module transformation directly onto a Float32Array 3D LUT buffer.
     * @param {Float32Array} buffer - Buffer of size x size x size x 4 RGBA elements
     * @param {number} size - LUT grid dimension
     * @returns {Float32Array}
     */
    apply(buffer: Float32Array): Float32Array;
    /**
     * Transforms a single RGB color pixel (0..1 range) into a reusable target array.
     * Virtual method to be overridden by sub-classes.
     */
    applyPixel(r: any, g: any, b: any, target?: number[]): number[];
    /**
     * Helper to create standard card header with title, reset button, and optional remove button.
     */
    createCardHeader(titleText: any, onReset: any, onRemove?: null): HTMLDivElement;
    /**
     * Helper to create parameter box with label, draggable number input, and range slider.
     */
    createSliderControl({ key, label, min, max, step, def }: {
        key: any;
        label: any;
        min: any;
        max: any;
        step: any;
        def: any;
    }): HTMLDivElement;
    onParamChange(): void;
    reset(): void;
    updateUI(): void;
    toJSON(): {
        id: any;
        params: any;
    };
    fromJSON(json: any): void;
}
