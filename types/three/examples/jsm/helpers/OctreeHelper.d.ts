import { ColorRepresentation, LineSegments } from '../../../src/Three';
import { Octree } from '../math/Octree';

export class OctreeHelper extends LineSegments {
    constructor(octree: Octree, color: ColorRepresentation);

    octree: Octree;
    color: ColorRepresentation;

    /**
     * @default 'OctreeHelper'
     */
    type: 'OctreeHelper' | string;
}

export interface OctreeHelperConstructor {
    new (octree: Octree, color: ColorRepresentation): OctreeHelper;
    prototype: OctreeHelper;
}
