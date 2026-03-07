/**
 * Represents a `discard` shader operation in TSL.
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {Node<float>} inputs.lightDistance - The distance of the light's position to the current fragment position.
 * @param {Node<float>} inputs.cutoffDistance - The light's cutoff distance.
 * @param {Node<float>} inputs.decayExponent - The light's decay exponent.
 * @return {Node<float>} The distance falloff.
 */
export const getDistanceAttenuation: () => void;
