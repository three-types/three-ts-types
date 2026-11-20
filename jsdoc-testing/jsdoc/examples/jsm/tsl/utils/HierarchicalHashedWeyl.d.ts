/**
 * Returns a TSL function that samples four independently seeded dimensions of Hierarchical Hashed Weyl.
 *
 * @param {UniformNode<Vector2>} resolution
 * @param {number} [seed=0] - Seeds the dimensions so each pass gets independent noise.
 * @return {Function} Takes a uv and a frame or sample index, returns a `vec4` of samples in [0,1).
 */
export function bindHierarchicalHashedWeyl(resolution: UniformNode<Vector2>, seed?: number): Function;
/**
 * Per-dimension temporal steps (0.32 fixed point) of Hierarchical Hashed Weyl (HHW), from the R2 and
 * R4 generalized golden ratio sequences. Each dimension needs its own step so a pixel's samples
 * don't line up over time. Use `R2_STEPS` for two values per pixel and `R4_STEPS` for four.
 */
export const R2_STEPS: number[];
export const R4_STEPS: number[];
export function hierarchicalHashedWeyl(coordinate: Node<vec2>, index: Node<any>, seed: number, step?: number): Node<float>;
