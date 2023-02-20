import { Vector2 } from './../math/Vector2.js';
import { Raycaster } from './../core/Raycaster.js';
import { Object3D } from './../core/Object3D.js';
import { Intersection } from '../core/Raycaster.js';
import { SpriteMaterial } from '../materials/Materials.js';
import { BufferGeometry } from '../core/BufferGeometry.js';

export class Sprite extends Object3D {
    constructor(material?: SpriteMaterial);

    type: 'Sprite';
    readonly isSprite: true;

    geometry: BufferGeometry;
    material: SpriteMaterial;
    center: Vector2;

    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    copy(source: this): this;
}
