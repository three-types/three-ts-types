import { AnimationClip, Object3D, Skeleton } from "three";

export interface RetargetOptions {
    preserveBoneMatrix?: boolean | undefined;
    preserveBonePositions?: boolean | undefined;
    preserveHipPosition?: boolean | undefined;
    useTargetMatrix?: boolean | undefined;
    hip?: string | undefined;
    scale?: number | undefined;
    names?: { [boneName: string]: string } | undefined;
}

declare function retarget(target: Object3D | Skeleton, source: Object3D | Skeleton, options: {}): void;

export interface RetargetClipOptions extends RetargetOptions {
    useFirstFramePosition?: boolean | undefined;
    fps?: number | undefined;
}

declare function retargetClip(
    target: Skeleton | Object3D,
    source: Skeleton | Object3D,
    clip: AnimationClip,
    options: {},
): AnimationClip;

declare function clone(source: Object3D): Object3D;

export { clone, retarget, retargetClip };
