import * as RAPIER from "@dimforge/rapier3d-compat";
import { Mesh, Object3D } from "three";

type Vector = { x: number; y: number; z: number };

export interface RapierPhysicsObject {
    RAPIER: typeof RAPIER;
    world: RAPIER.World;
    addScene: (scene: Object3D) => void;
    addMesh: (mesh: Mesh, mass?: number, restitution?: number) => void;
    setMeshPosition: (mesh: Mesh, position: Vector, index?: number) => void;
    setMeshVelocity: (mesh: Mesh, velocity: Vector, index?: number) => void;
}

export function RapierPhysics(): Promise<RapierPhysicsObject>;

export type RAPIER = typeof RAPIER;
