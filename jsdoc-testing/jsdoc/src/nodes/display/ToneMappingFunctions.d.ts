/**
 * Linear tone mapping, exposure only.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const linearToneMapping: any;
/**
 * Reinhard tone mapping.
 *
 * Reference: {@link https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const reinhardToneMapping: any;
/**
 * Cineon tone mapping.
 *
 * Reference: {@link http://filmicworlds.com/blog/filmic-tonemapping-operators/}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const cineonToneMapping: any;
/**
 * ACESFilmic tone mapping.
 *
 * Reference: {@link https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const acesFilmicToneMapping: any;
/**
 * AgX tone mapping.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const agxToneMapping: any;
/**
 * Neutral tone mapping.
 *
 * Reference: {@link https://modelviewer.dev/examples/tone-mapping}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const neutralToneMapping: any;
