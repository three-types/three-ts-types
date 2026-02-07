/**
 * TSL function for creating a triplanar textures node.
 *
 * Can be used for triplanar texture mapping.
 *
 * ```js
 * material.colorNode = triplanarTexture( texture( diffuseMap ) );
 * ```
 *
 * @tsl
 * @function
 * @param {Node} textureXNode - First texture node.
 * @param {?Node} [textureYNode=null] - Second texture node. When not set, the shader will sample from `textureXNode` instead.
 * @param {?Node} [textureZNode=null] - Third texture node. When not set, the shader will sample from `textureXNode` instead.
 * @param {?Node<float>} [scaleNode=float(1)] - The scale node.
 * @param {?Node<vec3>} [positionNode=positionLocal] - Vertex positions in local space.
 * @param {?Node<vec3>} [normalNode=normalLocal] - Normals in local space.
 * @returns {Node<vec4>}
 */
export const triplanarTextures: () => void;
export function triplanarTexture(...params: any[]): Node<vec4>;
