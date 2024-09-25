import { Group } from "../../objects/Group.js";
declare class BundleGroup extends Group {
    readonly isBundleGroup: true;
    readonly type: string;
    constructor();
    set needsUpdate(value: any);
}
export default BundleGroup;
