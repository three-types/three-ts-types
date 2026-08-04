/**
 * ColladaParser handles XML parsing and converts Collada XML to intermediate data structures.
 */
export class ColladaParser {
    count: number;
    generateId(): string;
    parse(text: any): {
        library: {
            animations: {};
            clips: {};
            controllers: {};
            images: {};
            effects: {};
            materials: {};
            cameras: {};
            lights: {};
            geometries: {};
            nodes: {};
            visualScenes: {};
            kinematicsModels: {};
            physicsModels: {};
            kinematicsScenes: {};
            joints: {};
        };
        asset: {
            unit: number;
            upAxis: any;
        };
        collada: any;
    } | null;
    library: {
        animations: {};
        clips: {};
        controllers: {};
        images: {};
        effects: {};
        materials: {};
        cameras: {};
        lights: {};
        geometries: {};
        nodes: {};
        visualScenes: {};
        kinematicsModels: {};
        physicsModels: {};
        kinematicsScenes: {};
        joints: {};
    } | undefined;
    collada: any;
    parserErrorToText(parserError: any): string;
    parseAsset(xml: any): {
        unit: number;
        upAxis: any;
    };
    parseAssetUnit(xml: any): number;
    parseAssetUpAxis(xml: any): any;
    parseLibrary(xml: any, libraryName: any, nodeName: any, parser: any): void;
    parseAnimation(xml: any): void;
    parseAnimationSampler(xml: any): {
        inputs: {};
    };
    parseAnimationChannel(xml: any): {
        member: any;
        indices: any;
        id: any;
        sid: any;
        arraySyntax: boolean;
        memberSyntax: boolean;
        sampler: any;
    };
    parseAnimationClip(xml: any): void;
    parseController(xml: any): void;
    parseSkin(xml: any): {
        sources: {};
    };
    parseJoints(xml: any): {
        inputs: {};
    };
    parseVertexWeights(xml: any): {
        inputs: {};
    };
    parseImage(xml: any): void;
    parseEffect(xml: any): void;
    parseEffectProfileCOMMON(xml: any): {
        surfaces: {};
        samplers: {};
    };
    parseEffectNewparam(xml: any, data: any): void;
    parseEffectSurface(xml: any): {
        init_from: any;
    };
    parseEffectSampler(xml: any): {
        source: any;
    };
    parseEffectTechnique(xml: any): {
        type: any;
        parameters: {};
        extra: {
            technique: {};
        };
    };
    parseEffectParameters(xml: any): {};
    parseEffectParameter(xml: any): {};
    parseEffectParameterTexture(xml: any): {
        technique: {};
    };
    parseEffectParameterTextureExtra(xml: any, data: any): void;
    parseEffectParameterTextureExtraTechnique(xml: any, data: any): void;
    parseEffectExtra(xml: any): {
        technique: {};
    };
    parseEffectExtraTechnique(xml: any): {};
    parseEffectExtraTechniqueBump(xml: any): {};
    parseMaterial(xml: any): void;
    parseCamera(xml: any): void;
    parseCameraOptics(xml: any): {};
    parseCameraTechnique(xml: any): {
        technique: any;
        parameters: {};
    };
    parseCameraParameters(xml: any): {};
    parseLight(xml: any): void;
    parseLightTechnique(xml: any): {
        technique: any;
        parameters: {
            color: Color;
            falloffAngle: number;
            distance: number;
        };
    };
    parseLightParameters(xml: any): {
        color: Color;
        falloffAngle: number;
        distance: number;
    };
    parseGeometry(xml: any): void;
    parseSource(xml: any): {
        array: never[];
        stride: number;
    };
    parseGeometryVertices(xml: any): {};
    parseGeometryPrimitive(xml: any): {
        type: any;
        material: any;
        count: number;
        inputs: {};
        stride: number;
        hasUV: boolean;
    };
    parseLibraryJoint(xml: any): void;
    parseKinematicsModel(xml: any): void;
    parseKinematicsTechniqueCommon(xml: any, data: any): void;
    parseKinematicsJoint(xml: any): {
        sid: any;
        name: any;
        axis: Vector3;
        limits: {
            min: number;
            max: number;
        };
        type: any;
        static: boolean;
        zeroPosition: number;
        middlePosition: number;
    } | undefined;
    parseKinematicsJointParameter(xml: any): {
        sid: any;
        name: any;
        axis: Vector3;
        limits: {
            min: number;
            max: number;
        };
        type: any;
        static: boolean;
        zeroPosition: number;
        middlePosition: number;
    };
    parseKinematicsLink(xml: any): {
        sid: any;
        name: any;
        attachments: never[];
        transforms: never[];
    };
    parseKinematicsAttachment(xml: any): {
        joint: any;
        transforms: never[];
        links: never[];
    };
    parseKinematicsTransform(xml: any): {
        type: any;
    };
    parsePhysicsModel(xml: any): void;
    parsePhysicsRigidBody(xml: any, data: any): void;
    parsePhysicsTechniqueCommon(xml: any, data: any): void;
    parseKinematicsScene(xml: any): void;
    parseKinematicsBindJointAxis(xml: any): {
        target: any;
    };
    prepareNodes(xml: any): void;
    parseNode(xml: any): {
        name: any;
        type: any;
        id: any;
        sid: any;
        matrix: Matrix4;
        nodes: never[];
        instanceCameras: never[];
        instanceControllers: never[];
        instanceLights: never[];
        instanceGeometries: never[];
        instanceNodes: never[];
        transforms: {};
        transformData: {};
        transformOrder: never[];
    };
    parseNodeInstance(xml: any): {
        id: any;
        materials: {};
        skeletons: never[];
    };
    parseVisualScene(xml: any): void;
    hasNode(id: any): boolean;
}
/**
 * Utility functions for parsing
 */
export function getElementsByTagName(xml: any, name: any): any[];
export function parseStrings(text: any): any;
export function parseFloats(text: any): any;
export function parseInts(text: any): any;
export function parseId(text: any): any;
import { Color } from 'three';
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
