import { Light } from "../../lights/Light.js";
import Node from "../core/Node.js";
import LightingNode from "./LightingNode.js";

declare module "../../lights/LightShadow.js" {
    export interface LightShadow {
        shadowNode?: Node;
    }
}

export default class AnalyticLightNode<T extends Light> extends LightingNode {
    light: T | null;

    constructor(light?: T | null);
}
