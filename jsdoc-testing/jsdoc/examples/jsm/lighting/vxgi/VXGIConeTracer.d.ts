/**
 * Emits the intersection of a ray with the bounds of the given volume.
 *
 * @param {VXGIVolume} volume - The volume.
 * @param {Node<vec3>} origin - The ray origin.
 * @param {Node<vec3>} direction - The normalized ray direction.
 * @return {{tEnter: Node<float>, tExit: Node<float>}} The entry and exit distances. The ray misses the volume if `tExit <= tEnter`.
 */
export function intersectVolume(volume: VXGIVolume, origin: Node<any>, direction: Node<any>): {
    tEnter: Node<any>;
    tExit: Node<any>;
};
/**
 * Emits a directional radiance lookup: for each axis the direction block facing the ray is
 * sampled from the directional texture and the three samples are blended with the squared
 * direction components. The block is selected arithmetically, so the lookup does not branch.
 *
 * @param {VXGIVolume} volume - The volume.
 * @param {Texture3DNode} directionalNode - The directional radiance texture node.
 * @param {Node<vec3>} uvw - The texture coordinates within the volume.
 * @param {Node<float>} level - The mip level of the directional texture.
 * @param {Node<vec3>} direction - The normalized ray direction.
 * @return {Node<vec4>} The premultiplied radiance and its weight.
 */
export function sampleDirectional(volume: VXGIVolume, directionalNode: Texture3DNode, uvw: Node<any>, level: Node<any>, direction: Node<any>): Node<any>;
/**
 * Creates a cone tracing function for a {@link VXGIVolume}. The returned function emits
 * TSL code that marches a cone through the volume's opacity/radiance mip chain and returns the
 * gathered radiance, the accumulated occlusion and a distance-weighted occlusion for AO.
 *
 * Implements the approximate voxel cone tracing of Crassin et al. 2011: the cone is sampled at
 * the mip level matching its current diameter with quadrilinear interpolation, samples are
 * composited front-to-back with the emission-absorption model, the opacity of a sample is
 * corrected for the step size and the anisotropic opacity (and, if given, the directional
 * radiance) is interpolated from the three directional values closest to the cone direction.
 * Cones leaving the volume gather nothing.
 *
 * @param {VXGIVolume} volume - The volume to trace.
 * @param {Object} [options={}] - Options.
 * @param {?TextureNode} [options.radianceNode=null] - The radiance texture node to gather from. If `null`, only occlusion is computed.
 * @param {?Texture3DNode} [options.directionalNode=null] - The directional radiance texture node of the coarser levels, see {@link VXGIVolume#directionalRadiance}. If `null`, the coarser levels are gathered from the radiance node's mips.
 * @param {number} [options.maxSteps=128] - Upper bound of steps per cone.
 * @return {Function} A function `( origin, direction, tanHalfAngle, maxDistance, aoDistance = null ) => { color, alpha, ao }`. AO is only computed if `aoDistance` is given.
 */
export function createConeTracer(volume: VXGIVolume, options?: {
    radianceNode?: TextureNode | null;
    directionalNode?: Texture3DNode | null;
    maxSteps?: number | undefined;
}): Function;
