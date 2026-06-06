/**
 * A material for drawing wireframe-style geometries.
 *
 * Unlike {@link LineBasicMaterial}, it supports arbitrary line widths and allows using world units
 * instead of screen space units. This material is used with {@link LineSegments2} and {@link Line2}.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * use {@link Line2NodeMaterial}.
 *
 * @augments ShaderMaterial
 * @three_import import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
 */
export class LineMaterial extends ShaderMaterial {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineMaterial: boolean;
    set color(value: Color);
    /**
     * The material's color.
     *
     * @type {Color}
     * @default (1,1,1)
     */
    get color(): Color;
    set worldUnits(value: boolean);
    /**
     * Whether the material's sizes (width, dash gaps) are in world units.
     *
     * @type {boolean}
     * @default false
     */
    get worldUnits(): boolean;
    set dashed(value: boolean);
    /**
     * Whether the line is dashed, or solid.
     *
     * @type {boolean}
     * @default false
     */
    get dashed(): boolean;
    set dashScale(value: number);
    /**
     * The scale of the dashes and gaps.
     *
     * @type {number}
     * @default 1
     */
    get dashScale(): number;
    set dashSize(value: number);
    /**
     * The size of the dash.
     *
     * @type {number}
     * @default 1
     */
    get dashSize(): number;
    set dashOffset(value: number);
    /**
     * Where in the dash cycle the dash starts.
     *
     * @type {number}
     * @default 0
     */
    get dashOffset(): number;
    set gapSize(value: number);
    /**
     * The size of the gap.
     *
     * @type {number}
     * @default 0
     */
    get gapSize(): number;
    set resolution(value: Vector2);
    /**
     * The size of the viewport, in screen pixels. This must be kept updated to make
     * screen-space rendering accurate. The `LineSegments2.onBeforeRender` callback
     * performs the update for visible objects.
     *
     * @type {Vector2}
     */
    get resolution(): Vector2;
}
import { ShaderMaterial } from 'three';
import { Vector2 } from 'three';
