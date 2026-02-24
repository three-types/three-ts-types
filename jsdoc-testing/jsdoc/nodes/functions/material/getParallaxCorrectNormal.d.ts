export default getParallaxCorrectNormal;
/**
 * This computes a parallax corrected normal which is used for box-projected cube mapping (BPCEM).
 *
 * Reference: {@link https://devlog-martinsh.blogspot.com/2011/09/box-projected-cube-environment-mapping.html}
 *
 * ```js
 * const uvNode = getParallaxCorrectNormal( reflectVector, vec3( 200, 100, 100 ), vec3( 0, - 50, 0 ) );
 * material.envNode = pmremTexture( renderTarget.texture, uvNode );
 * ```
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal to correct.
 * @param {Node<vec3>} cubeSize - The cube size should reflect the size of the environment (BPCEM is usually applied in closed environments like rooms).
 * @param {Node<vec3>} cubePos - The cube position.
 * @return {Node<vec3>} The parallax corrected normal.
 */
declare const getParallaxCorrectNormal: () => void;
