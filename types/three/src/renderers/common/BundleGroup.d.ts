import { Group } from "../../objects/Group.js";
declare class BundleGroup extends Group {
    readonly isBundleGroup: true;
    readonly type: string;
    constructor();
}
export default BundleGroup;
