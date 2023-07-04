import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { Object3D } from './../core/Object3D';
import { Shape } from './../extras/core/Shape';
import { Texture } from './../textures/Texture';
import { Material } from './../materials/Material';
import { AnimationClip } from './../animation/AnimationClip';
import { InstancedBufferGeometry } from '../core/InstancedBufferGeometry';
import { BufferGeometry } from '../core/BufferGeometry';
import { Source } from '../textures/Source';
import { Skeleton } from '../objects/Skeleton';

export class ObjectLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad?: (object: Object3D) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: Error | ErrorEvent) => void,
    ): void;
    loadAsync<ObjectType extends Object3D>(
        url: string,
        onProgress?: (event: ProgressEvent) => void,
    ): // tslint:disable-next-line:no-unnecessary-generics
    Promise<ObjectType>;
    // tslint:disable-next-line:no-unnecessary-generics
    parse<T extends Object3D>(json: any, onLoad?: (object: Object3D) => void): T;
    // tslint:disable-next-line:no-unnecessary-generics
    parseAsync<T extends Object3D>(json: any): Promise<T>;
    parseGeometries(json: any[], shapes: Shape[]): { [key: string]: InstancedBufferGeometry | BufferGeometry }; // Array of BufferGeometry or Geometry or Geometry2.
    parseMaterials(json: any[], textures: { [key: string]: Texture }): { [key: string]: Material }; // Array of Classes that inherits from Matrial.
    parseAnimations(json: any[]): { [key: string]: AnimationClip };
    parseShapes(json: any[]): { [key: string]: Shape };
    parseImages(json: any[], onLoad?: () => void): { [key: string]: Source };
    parseImagesAsync(json: any[]): Promise<{ [key: string]: Source }>;
    parseTextures(json: any[], images: any): { [key: string]: Texture };
    parseSkeletons(json: any[], object: Object3D): { [key: string]: Skeleton };
    bindSkeletons(object: Object3D, skeletons: Record<string, Skeleton>): void;
    parseObject<T extends Object3D>(
        data: any,
        geometries: Record<string, InstancedBufferGeometry | BufferGeometry>,
        materials: Record<string, Material>,
        textures: Record<string, Texture>,
        animations: Record<string, AnimationClip>,
    ): // tslint:disable-next-line:no-unnecessary-generics
    T;
}
