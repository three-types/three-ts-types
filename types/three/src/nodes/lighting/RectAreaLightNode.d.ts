import { DataTexture, RectAreaLight } from "three";
import Node from "../core/Node.js";
import AnalyticLightNode from "./AnalyticLightNode.js";

export interface RectAreaLightTexturesLib {
    LTC_HALF_1: DataTexture;
    LTC_HALF_2: DataTexture;

    LTC_FLOAT_1: DataTexture;
    LTC_FLOAT_2: DataTexture;
}

export default class RectAreaLightNode extends AnalyticLightNode<RectAreaLight> {
    halfHeight: Node;
    halfWidth: Node;

    constructor(light?: RectAreaLight | null);

    static setLTC(ltc: RectAreaLightTexturesLib): void;
}
