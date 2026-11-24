/**
 * Generates a hash value in the range `[0, 1]` from the given seed. The seed is
 * converted to `uint`, so the fractional part of a float seed is discarded.
 *
 * @tsl
 * @function
 * @param {Node<uint>} seed - The seed.
 * @return {Node<float>} The hash value.
 */
export const hash: () => void;
