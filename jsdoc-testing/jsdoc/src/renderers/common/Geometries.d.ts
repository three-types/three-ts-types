export default Geometries;
/**
 * This renderer module manages geometries.
 *
 * @private
 * @augments DataMap
 */
declare class Geometries extends DataMap {
    /**
     * Constructs a new geometry management component.
     *
     * @param {Attributes} attributes - Renderer component for managing attributes.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(attributes: Attributes, info: Info);
    /**
     * Renderer component for managing attributes.
     *
     * @type {Attributes}
     */
    attributes: Attributes;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * Weak Map for managing attributes for wireframe rendering.
     *
     * @type {WeakMap<BufferGeometry,BufferAttribute>}
     */
    wireframes: WeakMap<BufferGeometry, BufferAttribute>;
    /**
     * This Weak Map is used to make sure buffer attributes are
     * updated only once per render call.
     *
     * @type {WeakMap<BufferAttribute,number>}
     */
    attributeCall: WeakMap<BufferAttribute, number>;
    /**
     * Stores weak references to the geometries with attached
     * `dispose` event listeners.
     *
     * @private
     * @type {Set<WeakRef<BufferGeometry>>}
     */
    private _tracked;
    /**
     * Removes weak references from `_tracked` when their geometry
     * has been garbage collected without an explicit `dispose()`.
     *
     * @private
     * @type {FinalizationRegistry}
     */
    private _registry;
    /**
     * Returns `true` if the given geometry is initialized.
     *
     * @param {BufferGeometry} geometry - The geometry.
     * @return {boolean} Whether if the given geometry is initialized or not.
     */
    has(geometry: BufferGeometry): boolean;
    /**
     * Prepares the geometry of the given render object for rendering.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Initializes the given geometry.
     *
     * @param {BufferGeometry} geometry - The geometry.
     */
    initGeometry(geometry: BufferGeometry): void;
    /**
     * Updates the geometry attributes of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateAttributes(renderObject: RenderObject): void;
    /**
     * Updates the given attribute.
     *
     * @param {BufferAttribute} attribute - The attribute to update.
     * @param {number} type - The attribute type.
     */
    updateAttribute(attribute: BufferAttribute, type: number): void;
    /**
     * Returns the indirect buffer attribute of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {?BufferAttribute} The indirect attribute. `null` if no indirect drawing is used.
     */
    getIndirect(renderObject: RenderObject): BufferAttribute | null;
    /**
     * Returns the byte offset into the indirect attribute buffer of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {number} The byte offset into the indirect attribute buffer.
     */
    getIndirectOffset(renderObject: RenderObject): number;
    /**
     * Returns the index of the given render object's geometry. This is implemented
     * in a method to return a wireframe index if necessary.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {?BufferAttribute} The index. Returns `null` for non-indexed geometries.
     */
    getIndex(renderObject: RenderObject): BufferAttribute | null;
    /**
     * Deletes the attributes that are defined via nodes and not on geometry level.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    deleteNodeAttributes(renderObject: RenderObject): void;
}
import DataMap from './DataMap.js';
