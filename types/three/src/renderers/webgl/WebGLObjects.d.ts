import { WebGLGeometries } from './WebGLGeometries.js';
import { WebGLAttributes } from './WebGLAttributes.js';
import { WebGLInfo } from './WebGLInfo.js';
import { WebGLBindingStates } from './WebGLBindingStates.js';
import { Object3D } from '../../core/Object3D.js';
import { BufferGeometry } from '../../core/BufferGeometry.js';

export class WebGLObjects {
    constructor(gl: WebGLRenderingContext, geometries: WebGLGeometries, attributes: WebGLAttributes, bindingStates: WebGLBindingStates, info: WebGLInfo);

    update(object: Object3D): BufferGeometry;
    dispose(): void;
}
