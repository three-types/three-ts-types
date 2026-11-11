import { Node, UniformNode } from "three/webgpu";

/**
 * Returns a TSL function that samples four independently seeded dimensions of Hierarchical Hashed Weyl.
 *
 * @param {UniformNode<Vector2>} resolution
 * @param {number} [seed=0] - Seeds the dimensions so each pass gets independent noise.
 * @return {Function} Takes a uv and a frame or sample index, returns a `vec4` of samples in [0,1).
 */
export function bindHierarchicalHashedWeyl(
    resolution: UniformNode<"vec2">,
    seed?: number,
): (uvCoord: Node<"vec2">, sampleIndex: Node | number) => Node<"vec4">;
/**
 * Per-dimension temporal steps (0.32 fixed point) of Hierarchical Hashed Weyl (HHW), from the R2 and
 * R4 generalized golden ratio sequences. Each dimension needs its own step so a pixel's samples
 * don't line up over time. Use `R2_STEPS` for two values per pixel and `R4_STEPS` for four.
 */
export const R2_STEPS: number[];
export const R4_STEPS: number[];
/**
 * Hierarchical Hashed Weyl (HHW): texture-free noise where each aligned 8×8 tile gets a scrambled
 * three-level hierarchical rank pattern and a hashed phase, shifted by a Weyl sequence over time.
 *
 * This algorithm is Houston Stratified Noise, described at
 * {@link https://ben3d.ca/blog/houston-stratified-noise}.
 *
 * @param {Node<vec2>} coordinate - Pixel coordinates.
 * @param {Node<uint>} index - Frame or sample index.
 * @param {number} seed - Seed; use a different one per dimension.
 * @param {number} [step=2654435769] - Temporal step; use one of `R2_STEPS` or `R4_STEPS` per dimension.
 * @return {Node<float>} Sample in [0,1).
 */
export function hierarchicalHashedWeyl(
    coordinate: Node<"vec2">,
    index: Node<"uint"> | number,
    seed: number,
    step?: number,
): Node<"float">;
