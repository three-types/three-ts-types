/**
 * Creates a simulated lens flare that tracks a light.
 *
 * Note that this class can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, use {@link Lensflare}.
 *
 * ```js
 * const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
 *
 * const lensflare = new LensflareMesh();
 * lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) );
 * lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
 * lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );
 *
 * light.add( lensflare );
 * ```
 *
 * @augments Mesh
 * @three_import import { LensflareMesh } from 'three/addons/objects/LensflareMesh.js';
 */
export class LensflareMesh extends Mesh {
    /**
     * Constructs a new lensflare mesh.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLensflareMesh: boolean;
    _tempMap: FramebufferTexture;
    _occlusionMap: FramebufferTexture;
    _currentType: number;
    _sharedValues: {
        scale: Vector2;
        positionScreen: Vector3;
    };
    _material1a: NodeMaterial;
    _material1b: NodeMaterial;
    _material2: NodeMaterial;
    _mesh1: Mesh;
    _elements: any[];
    _elementMeshes: any[];
    _lightsNode: Node;
    /**
     * Adds the given lensflare element to this instance.
     *
     * @param {LensflareElement} element - The element to add.
     */
    addElement(element: LensflareElement): void;
    onBeforeRender(renderer: any, scene: any, camera: any): void;
}
export namespace LensflareMesh {
    let Geometry: BufferGeometry;
}
export class LensflareElement {
    constructor(texture: any, size?: number, distance?: number, color?: Color);
    texture: any;
    size: number;
    distance: number;
    color: Color;
}
import { Mesh } from 'three/webgpu';
import { FramebufferTexture } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
import { NodeMaterial } from 'three/webgpu';
import { Node } from 'three/webgpu';
import { BufferGeometry } from 'three/webgpu';
import { Color } from 'three/webgpu';
