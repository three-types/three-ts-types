import { Mesh } from "../../objects/Mesh.js";
import ReferenceNode from "./ReferenceNode.js";

/**
 * TSL object representing a reference to the mesh's morphTargetInfluences array.
 *
 * @type {ReferenceNode<float>}
 */
export const morphTargetInfluences: ReferenceNode<"float", unknown>;
/**
 * TSL function representing the vertex shader morph targets blend setup.
 * Dynamically computes morph targets weights and updates positionLocal and normalLocal in-place.
 *
 * @tsl
 * @function
 * @param {Mesh} mesh - The mesh.
 */
export const morphReference: (mesh: Mesh) => void;
