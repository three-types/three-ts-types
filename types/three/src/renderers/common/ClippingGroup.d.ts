import { Plane } from "../../math/Plane.js";
import { Group } from "../../objects/Group.js";
declare class ClippingGroup extends Group {
    readonly isClippingGroup: true;
    clippingPlanes: Plane[];
    enabled: boolean;
    clipIntersection: boolean;
    clipShadows: boolean;
    constructor();
}
export default ClippingGroup;
