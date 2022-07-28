import ContextNode from '../../../nodes/core/ContextNode.js';

export type WebGLPhysicalContextScope = 'radiance' | 'irradiance';

export default class WebGLPhysicalContextNode extends ContextNode {
    constructor(scope: WebGLPhysicalContextScope, node: Node);
}
