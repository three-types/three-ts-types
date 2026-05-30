/**
 * Applies a motion blur effect to the given input node.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} inputNode - The input node to apply the motion blur for.
 * @param {Node<vec2>} velocity - The motion vectors of the beauty pass.
 * @param {Node<int>} [numSamples=int(16)] - How many samples the effect should use. A higher value results in better quality but is also more expensive.
 * @return {Node<vec4>} The input node with the motion blur effect applied.
 */
export const motionBlur: () => void;
