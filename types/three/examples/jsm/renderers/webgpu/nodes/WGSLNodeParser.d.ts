import NodeParser from "../../../nodes/core/NodeParser";
import WGSLNodeFunction from "./WGSLNodeFunction";

export default class WGSLNodeParser extends NodeParser {
    parseFunction(source: string): WGSLNodeFunction;
}
