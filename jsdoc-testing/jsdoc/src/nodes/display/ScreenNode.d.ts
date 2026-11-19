/**
 * TSL object that represents the current DPR.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const screenDPR: UniformNode<float>;
/**
 * TSL object that represents the screen resolution in physical pixel units.
 *
 * @tsl
 * @type {UniformNode<vec2>}
 */
export const screenSize: UniformNode<any>;
/**
 * TSL object that represents the current `x`/`y` pixel position on the screen in physical pixel units.
 * The coordinates are window-relative according to WebGPU standards.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const screenCoordinate: Node<any>;
/**
 * TSL object that represents normalized screen coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const screenUV: Node<any>;
/**
 * TSL object that represents the viewport rectangle as `x`, `y`, `width` and `height` in physical pixel units.
 *
 * @tsl
 * @type {UniformNode<vec4>}
 */
export const viewport: UniformNode<vec4>;
/**
 * TSL object that represents the viewport resolution in physical pixel units.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const viewportSize: Node<any>;
/**
 * TSL object that represents the current `x`/`y` pixel position on the viewport in physical pixel units.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const viewportCoordinate: Node<any>;
/**
 * TSL object that represents normalized viewport coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const viewportUV: Node<any>;
