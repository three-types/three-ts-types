import Node from "../core/Node.js";

export const blendBurn: (
    base: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
    blend: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
) => Node<"vec3">;

export const blendDodge: (
    base: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
    blend: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
) => Node<"vec3">;

export const blendScreen: (
    base: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
    blend: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
) => Node<"vec3">;

export const blendOverlay: (
    base: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
    blend: number | Node<"float"> | Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
) => Node<"vec3">;

export const blendColor: (base: Node<"vec4">, blend: Node<"vec4">) => Node<"vec4">;

export const premultiplyAlpha: (color: Node<"vec4">) => Node<"vec4">;

export const unpremultiplyAlpha: (color: Node<"vec4">) => Node<"vec4">;

/**
 * @deprecated
 */
export const burn: (base: Node<"vec3">, blend: Node<"vec3">) => Node<"vec3">;

/**
 * @deprecated
 */
export const dodge: (base: Node<"vec3">, blend: Node<"vec3">) => Node<"vec3">;

/**
 * @deprecated
 */
export const screen: (base: Node<"vec3">, blend: Node<"vec3">) => Node<"vec3">;

/**
 * @deprecated
 */
export const overlay: (base: Node<"vec3">, blend: Node<"vec3">) => Node<"vec3">;
