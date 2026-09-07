/**
 * ColladaComposer converts parsed library data into Three.js objects.
 */
export class ColladaComposer {
    constructor(library: any, collada: any, textureLoader: any, tgaLoader: any);
    library: any;
    collada: any;
    textureLoader: any;
    tgaLoader: any;
    tempColor: Color;
    animations: any[];
    kinematics: {};
    position: Vector3;
    scale: Vector3;
    quaternion: Quaternion;
    matrix: Matrix4;
    deferredPivotAnimations: {};
    transformNodes: {};
    compose(): {
        scene: any;
        animations: any[];
        kinematics: {};
    };
    buildLibrary(data: any, builder: any): void;
    getBuild(data: any, builder: any): any;
    isEmpty(object: any): boolean;
    buildAnimation(data: any): any[];
    collectDeferredPivotAnimation(nodeId: any, nodeChannels: any): void;
    hasPivotTransforms(nodeData: any): boolean;
    getAnimation(id: any): any;
    aggregateAnimationChannels(channels: any, samplers: any, sources: any): {};
    buildMatrixTracks(object3D: any, channelData: any, nodeData: any, tracks: any): void;
    buildTranslateTrack(object3D: any, channelData: any, transformInfo: any, tracks: any): void;
    buildRotateTrack(object3D: any, sid: any, channelData: any, transformInfo: any, nodeData: any, tracks: any): void;
    buildScaleTrack(object3D: any, channelData: any, transformInfo: any, tracks: any): void;
    getTimesForAllAxes(channelData: any): any[];
    getValueAtTime(componentData: any, time: any, defaultValue: any): any;
    evaluateBezierComponent(componentData: any, i0: any, i1: any, t0: any, t1: any, time: any): number;
    getInterpolationInfo(channelData: any): {
        type: any;
        uniform: boolean;
    };
    applyInterpolation(track: any, interpolationInfo: any, channelData?: null): void;
    prepareAnimationData(data: any, defaultMatrix: any): {
        time: number;
        value: any;
    }[];
    createKeyframeTracks(animation: any, tracks: any): any;
    transformAnimationData(keyframes: any, property: any, defaultValue: any): void;
    createMissingKeyframes(keyframes: any, property: any): void;
    getPrev(keyframes: any, i: any, property: any): any;
    getNext(keyframes: any, i: any, property: any): any;
    interpolate(key: any, prev: any, next: any, property: any): void;
    buildAnimationClip(data: any): AnimationClip;
    getAnimationClip(id: any): any;
    buildController(data: any): {
        id: any;
    };
    buildSkin(data: any): {
        joints: never[];
        indices: {
            array: never[];
            stride: number;
        };
        weights: {
            array: never[];
            stride: number;
        };
    };
    getController(id: any): any;
    buildImage(data: any): any;
    getImage(id: any): any;
    buildEffect(data: any): any;
    getEffect(id: any): any;
    getTextureLoader(image: any): any;
    buildMaterial(data: any): MeshBasicMaterial | MeshPhongMaterial | MeshLambertMaterial;
    getMaterial(id: any): any;
    buildCamera(data: any): PerspectiveCamera | OrthographicCamera;
    getCamera(id: any): any;
    buildLight(data: any): SpotLight | PointLight | DirectionalLight | AmbientLight | undefined;
    getLight(id: any): any;
    groupPrimitives(primitives: any): {};
    checkUVCoordinates(primitives: any): void;
    buildGeometry(data: any): {};
    buildGeometryType(primitives: any, sources: any, vertices: any): {
        data: BufferGeometry;
        type: any;
        materialKeys: any[];
    };
    buildGeometryData(primitive: any, source: any, offset: any, array: any, isColor?: boolean): void;
    getGeometry(id: any): any;
    buildKinematicsModel(data: any): any;
    getKinematicsModel(id: any): any;
    buildKinematicsScene(data: any): any;
    getKinematicsScene(id: any): any;
    setupKinematics(): void;
    buildTransformList(node: any): ({
        sid: any;
        type: any;
        obj: Matrix4;
        angle?: undefined;
    } | {
        sid: any;
        type: any;
        obj: Vector3;
        angle?: undefined;
    } | {
        sid: any;
        type: any;
        obj: Vector3;
        angle: number;
    })[];
    buildSkeleton(skeletons: any, joints: any): Skeleton;
    buildBoneHierarchy(root: any, joints: any, boneData: any): void;
    buildNode(data: any): any;
    wrapWithTransformHierarchy(contentObject: any, nodeData: any): Group;
    resolveMaterialBinding(keys: any, instanceMaterials: any): any[];
    get fallbackMaterial(): MeshBasicMaterial;
    _fallbackMaterial: MeshBasicMaterial | undefined;
    buildObjects(geometries: any, instanceMaterials: any): (Mesh | SkinnedMesh | Line | undefined)[];
    hasNode(id: any): boolean;
    getNode(id: any): any;
    buildVisualScene(data: any): Group;
    hasVisualScene(id: any): boolean;
    getVisualScene(id: any): any;
    parseScene(xml: any): any;
    parseId(text: any): any;
    setupAnimations(): void;
    buildDeferredPivotAnimationTracks(tracks: any): void;
    buildTransformHierarchyTracks(nodeId: any, nodeChannels: any, nodeData: any, tracks: any): void;
    buildHierarchyTranslateTrack(transformNode: any, channelData: any, transformInfo: any, tracks: any): void;
    buildHierarchyRotateTrack(transformNode: any, channelData: any, transformInfo: any, tracks: any): void;
    buildHierarchyScaleTrack(transformNode: any, channelData: any, transformInfo: any, tracks: any): void;
}
import { Color } from 'three';
import { Vector3 } from 'three';
import { Quaternion } from 'three';
import { Matrix4 } from 'three';
import { AnimationClip } from 'three';
import { MeshBasicMaterial } from 'three';
import { MeshPhongMaterial } from 'three';
import { MeshLambertMaterial } from 'three';
import { PerspectiveCamera } from 'three';
import { OrthographicCamera } from 'three';
import { SpotLight } from 'three';
import { PointLight } from 'three';
import { DirectionalLight } from 'three';
import { AmbientLight } from 'three';
import { BufferGeometry } from 'three';
import { Skeleton } from 'three';
import { Group } from 'three';
import { Mesh } from 'three';
import { SkinnedMesh } from 'three';
import { Line } from 'three';
