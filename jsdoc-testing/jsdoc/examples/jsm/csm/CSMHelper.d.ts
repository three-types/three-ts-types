/**
 * A helper for visualizing the cascades of a CSM instance.
 *
 * @augments Group
 * @three_import import { CSMHelper } from 'three/addons/csm/CSMHelper.js';
 */
export class CSMHelper extends Group {
    /**
     * Constructs a new CSM helper.
     *
     * @param {CSM|CSMShadowNode} csm - The CSM instance to visualize.
     */
    constructor(csm: CSM | CSMShadowNode);
    /**
     * The CSM instance to visualize.
     *
     * @type {CSM|CSMShadowNode}
     */
    csm: CSM | CSMShadowNode;
    /**
     * Whether to display the CSM frustum or not.
     *
     * @type {boolean}
     * @default true
     */
    displayFrustum: boolean;
    /**
     * Whether to display the cascade planes or not.
     *
     * @type {boolean}
     * @default true
     */
    displayPlanes: boolean;
    /**
     * Whether to display the shadow bounds or not.
     *
     * @type {boolean}
     * @default true
     */
    displayShadowBounds: boolean;
    frustumLines: LineSegments;
    cascadeLines: any[];
    cascadePlanes: any[];
    shadowLines: any[];
    /**
     * This method must be called if one of the `display*` properties is changed at runtime.
     */
    updateVisibility(): void;
    /**
     * Updates the helper. This method should be called in the app's animation loop.
     */
    update(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Group } from 'three';
import { LineSegments } from 'three';
