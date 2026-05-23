export default RenderList;
/**
 * When the renderer analyzes the scene at the beginning of a render call,
 * it stores 3D object for further processing in render lists. Depending on the
 * properties of a 3D objects (like their transformation or material state), the
 * objects are maintained in ordered lists for the actual rendering.
 *
 * Render lists are unique per scene and camera combination.
 *
 * @private
 * @augments Pipeline
 */
declare class RenderList {
    /**
     * Constructs a render list.
     *
     * @param {Lighting} lighting - The lighting management component.
     * @param {Scene} scene - The scene.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(lighting: Lighting, scene: Scene, camera: Camera);
    /**
     * 3D objects are transformed into render items and stored in this array.
     *
     * @type {Array<Object>}
     */
    renderItems: Array<Object>;
    /**
     * The current render items index.
     *
     * @type {number}
     * @default 0
     */
    renderItemsIndex: number;
    /**
     * A list with opaque render items.
     *
     * @type {Array<Object>}
     */
    opaque: Array<Object>;
    /**
     * A list with transparent render items which require
     * double pass rendering (e.g. transmissive objects).
     *
     * @type {Array<Object>}
     */
    transparentDoublePass: Array<Object>;
    /**
     * A list with transparent render items.
     *
     * @type {Array<Object>}
     */
    transparent: Array<Object>;
    /**
     * A list with transparent render bundle data.
     *
     * @type {Array<Object>}
     */
    bundles: Array<Object>;
    /**
     * The render list's lights node. This node is later
     * relevant for the actual analytical light nodes which
     * compute the scene's lighting in the shader.
     *
     * @type {LightsNode}
     */
    lightsNode: LightsNode;
    /**
     * The scene's lights stored in an array. This array
     * is used to setup the lights node.
     *
     * @type {Array<Light>}
     */
    lightsArray: Array<Light>;
    /**
     * The scene.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera the scene is rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * How many objects perform occlusion query tests.
     *
     * @type {number}
     * @default 0
     */
    occlusionQueryCount: number;
    /**
     * This method is called right at the beginning of a render call
     * before the scene is analyzed. It prepares the internal data
     * structures for the upcoming render lists generation.
     *
     * @return {RenderList} A reference to this render list.
     */
    begin(): RenderList;
    /**
     * Returns a render item for the giving render item state. The state is defined
     * by a series of object-related parameters.
     *
     * The method avoids object creation by holding render items and reusing them in
     * subsequent render calls (just with different property values).
     *
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} material - The 3D object's material.
     * @param {number} groupOrder - The current group order.
     * @param {number} z - Th 3D object's depth value (z value in clip space).
     * @param {?number} group - {?Object} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {ClippingContext} clippingContext - The current clipping context.
     * @return {Object} The render item.
     */
    getNextRenderItem(object: Object3D, geometry: BufferGeometry, material: Material, groupOrder: number, z: number, group: number | null, clippingContext: ClippingContext): Object;
    /**
     * Pushes the given object as a render item to the internal render lists.
     * The selected lists depend on the object properties.
     *
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} material - The 3D object's material.
     * @param {number} groupOrder - The current group order.
     * @param {number} z - Th 3D object's depth value (z value in clip space).
     * @param {?number} group - {?Object} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {ClippingContext} clippingContext - The current clipping context.
     */
    push(object: Object3D, geometry: BufferGeometry, material: Material, groupOrder: number, z: number, group: number | null, clippingContext: ClippingContext): void;
    /**
     * Inserts the given object as a render item at the start of the internal render lists.
     * The selected lists depend on the object properties.
     *
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} material - The 3D object's material.
     * @param {number} groupOrder - The current group order.
     * @param {number} z - Th 3D object's depth value (z value in clip space).
     * @param {?number} group - {?Object} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {ClippingContext} clippingContext - The current clipping context.
     */
    unshift(object: Object3D, geometry: BufferGeometry, material: Material, groupOrder: number, z: number, group: number | null, clippingContext: ClippingContext): void;
    /**
     * Pushes render bundle group data into the render list.
     *
     * @param {Object} group - Bundle group data.
     */
    pushBundle(group: Object): void;
    /**
     * Pushes a light into the render list.
     *
     * @param {Light} light - The light.
     */
    pushLight(light: Light): void;
    /**
     * Sorts the internal render lists.
     *
     * @param {?function(any, any): number} customOpaqueSort - A custom sort function for opaque objects.
     * @param {?function(any, any): number} customTransparentSort -  A custom sort function for transparent objects.
     */
    sort(customOpaqueSort: ((arg0: any, arg1: any) => number) | null, customTransparentSort: ((arg0: any, arg1: any) => number) | null): void;
    /**
     * This method performs finalizing tasks right after the render lists
     * have been generated.
     */
    finish(): void;
}
