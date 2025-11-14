import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";

export function lightShadowMatrix(light: Light): Node<"mat4">;

export function lightProjectionUV(light: Light, position?: Node<"vec3">): Node<"vec3">;

export function lightPosition(light: Light): Node<"vec3">;

export function lightTargetPosition(light: Light): Node<"vec3">;

export function lightViewPosition(light: Light): Node<"vec3">;

export const lightTargetDirection: (light: Light) => Node<"vec3">;
