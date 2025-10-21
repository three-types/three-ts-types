/**
 * A standard physically based material, using Metallic-Roughness workflow.
 *
 * Physically based rendering (PBR) has recently become the standard in many
 * 3D applications, such as [Unity]{@link https://blogs.unity3d.com/2014/10/29/physically-based-shading-in-unity-5-a-primer/},
 * [Unreal]{@link https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/PhysicallyBased/} and
 * [3D Studio Max]{@link http://area.autodesk.com/blogs/the-3ds-max-blog/what039s-new-for-rendering-in-3ds-max-2017}.
 *
 * This approach differs from older approaches in that instead of using
 * approximations for the way in which light interacts with a surface, a
 * physically correct model is used. The idea is that, instead of tweaking
 * materials to look good under specific lighting, a material can be created
 * that will react 'correctly' under all lighting scenarios.
 *
 * In practice this gives a more accurate and realistic looking result than
 * the {@link MeshLambertMaterial} or {@link MeshPhongMaterial}, at the cost of
 * being somewhat more computationally expensive. `MeshStandardMaterial` uses per-fragment
 * shading.
 *
 * Note that for best results you should always specify an environment map when using this material.
 *
 * For a non-technical introduction to the concept of PBR and how to set up a
 * PBR material, check out these articles by the people at [marmoset]{@link https://www.marmoset.co}:
 *
 * - [Basic Theory of Physically Based Rendering]{@link https://www.marmoset.co/posts/basic-theory-of-physically-based-rendering/}
 * - [Physically Based Rendering and You Can Too]{@link https://www.marmoset.co/posts/physically-based-rendering-and-you-can-too/}
 *
 * Technical details of the approach used in three.js (and most other PBR systems) can be found is this
 * [paper from Disney]{@link https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf}
 * (pdf), by Brent Burley.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshStandardMaterial
 */
export class MeshStandardMaterial extends Material {
    /**
     * Constructs a new mesh standard material.
     *
     * @param {Object} [parameters] - An object with one or more properties
     * defining the material's appearance. Any property of the material
     * (including any property from inherited materials) can be passed
     * in here. Color values can be passed any type of value accepted
     * by {@link Color#set}.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshStandardMaterial: boolean;
    type: string;
    defines: {
        STANDARD: string;
    };
    /**
     * Color of the material.
     *
     * @type {Color}
     * @default (1,1,1)
     */
    color: Color;
    /**
     * How rough the material appears. `0.0` means a smooth mirror reflection, `1.0`
     * means fully diffuse. If `roughnessMap` is also provided,
     * both values are multiplied.
     *
     * @type {number}
     * @default 1
     */
    roughness: number;
    /**
     * How much the material is like a metal. Non-metallic materials such as wood
     * or stone use `0.0`, metallic use `1.0`, with nothing (usually) in between.
     * A value between `0.0` and `1.0` could be used for a rusty metal look.
     * If `metalnessMap` is also provided, both values are multiplied.
     *
     * @type {number}
     * @default 0
     */
    metalness: number;
    /**
     * The color map. May optionally include an alpha channel, typically combined
     * with {@link Material#transparent} or {@link Material#alphaTest}. The texture map
     * color is modulated by the diffuse `color`.
     *
     * @type {?Texture}
     * @default null
     */
    map: Texture | null;
    /**
     * The light map. Requires a second set of UVs.
     *
     * @type {?Texture}
     * @default null
     */
    lightMap: Texture | null;
    /**
     * Intensity of the baked light.
     *
     * @type {number}
     * @default 1
     */
    lightMapIntensity: number;
    /**
     * The red channel of this texture is used as the ambient occlusion map.
     * Requires a second set of UVs.
     *
     * @type {?Texture}
     * @default null
     */
    aoMap: Texture | null;
    /**
     * Intensity of the ambient occlusion effect. Range is `[0,1]`, where `0`
     * disables ambient occlusion. Where intensity is `1` and the AO map's
     * red channel is also `1`, ambient light is fully occluded on a surface.
     *
     * @type {number}
     * @default 1
     */
    aoMapIntensity: number;
    /**
     * Emissive (light) color of the material, essentially a solid color
     * unaffected by other lighting.
     *
     * @type {Color}
     * @default (0,0,0)
     */
    emissive: Color;
    /**
     * Intensity of the emissive light. Modulates the emissive color.
     *
     * @type {number}
     * @default 1
     */
    emissiveIntensity: number;
    /**
     * Set emissive (glow) map. The emissive map color is modulated by the
     * emissive color and the emissive intensity. If you have an emissive map,
     * be sure to set the emissive color to something other than black.
     *
     * @type {?Texture}
     * @default null
     */
    emissiveMap: Texture | null;
    /**
     * The texture to create a bump map. The black and white values map to the
     * perceived depth in relation to the lights. Bump doesn't actually affect
     * the geometry of the object, only the lighting. If a normal map is defined
     * this will be ignored.
     *
     * @type {?Texture}
     * @default null
     */
    bumpMap: Texture | null;
    /**
     * How much the bump map affects the material. Typical range is `[0,1]`.
     *
     * @type {number}
     * @default 1
     */
    bumpScale: number;
    /**
     * The texture to create a normal map. The RGB values affect the surface
     * normal for each pixel fragment and change the way the color is lit. Normal
     * maps do not change the actual shape of the surface, only the lighting. In
     * case the material has a normal map authored using the left handed
     * convention, the `y` component of `normalScale` should be negated to compensate
     * for the different handedness.
     *
     * @type {?Texture}
     * @default null
     */
    normalMap: Texture | null;
    /**
     * The type of normal map.
     *
     * @type {(TangentSpaceNormalMap|ObjectSpaceNormalMap)}
     * @default TangentSpaceNormalMap
     */
    normalMapType: (number | ObjectSpaceNormalMap);
    /**
     * How much the normal map affects the material. Typical value range is `[0,1]`.
     *
     * @type {Vector2}
     * @default (1,1)
     */
    normalScale: Vector2;
    /**
     * The displacement map affects the position of the mesh's vertices. Unlike
     * other maps which only affect the light and shade of the material the
     * displaced vertices can cast shadows, block other objects, and otherwise
     * act as real geometry. The displacement texture is an image where the value
     * of each pixel (white being the highest) is mapped against, and
     * repositions, the vertices of the mesh.
     *
     * @type {?Texture}
     * @default null
     */
    displacementMap: Texture | null;
    /**
     * How much the displacement map affects the mesh (where black is no
     * displacement, and white is maximum displacement). Without a displacement
     * map set, this value is not applied.
     *
     * @type {number}
     * @default 0
     */
    displacementScale: number;
    /**
     * The offset of the displacement map's values on the mesh's vertices.
     * The bias is added to the scaled sample of the displacement map.
     * Without a displacement map set, this value is not applied.
     *
     * @type {number}
     * @default 0
     */
    displacementBias: number;
    /**
     * The green channel of this texture is used to alter the roughness of the
     * material.
     *
     * @type {?Texture}
     * @default null
     */
    roughnessMap: Texture | null;
    /**
     * The blue channel of this texture is used to alter the metalness of the
     * material.
     *
     * @type {?Texture}
     * @default null
     */
    metalnessMap: Texture | null;
    /**
     * The alpha map is a grayscale texture that controls the opacity across the
     * surface (black: fully transparent; white: fully opaque).
     *
     * Only the color of the texture is used, ignoring the alpha channel if one
     * exists. For RGB and RGBA textures, the renderer will use the green channel
     * when sampling this texture due to the extra bit of precision provided for
     * green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and
     * luminance/alpha textures will also still work as expected.
     *
     * @type {?Texture}
     * @default null
     */
    alphaMap: Texture | null;
    /**
     * The environment map. To ensure a physically correct rendering, environment maps
     * are internally pre-processed with {@link PMREMGenerator}.
     *
     * @type {?Texture}
     * @default null
     */
    envMap: Texture | null;
    /**
     * The rotation of the environment map in radians.
     *
     * @type {Euler}
     * @default (0,0,0)
     */
    envMapRotation: Euler;
    /**
     * Scales the effect of the environment map by multiplying its color.
     *
     * @type {number}
     * @default 1
     */
    envMapIntensity: number;
    /**
     * Renders the geometry as a wireframe.
     *
     * @type {boolean}
     * @default false
     */
    wireframe: boolean;
    /**
     * Controls the thickness of the wireframe.
     *
     * Can only be used with {@link SVGRenderer}.
     *
     * @type {number}
     * @default 1
     */
    wireframeLinewidth: number;
    /**
     * Defines appearance of wireframe ends.
     *
     * Can only be used with {@link SVGRenderer}.
     *
     * @type {('round'|'bevel'|'miter')}
     * @default 'round'
     */
    wireframeLinecap: ("round" | "bevel" | "miter");
    /**
     * Defines appearance of wireframe joints.
     *
     * Can only be used with {@link SVGRenderer}.
     *
     * @type {('round'|'bevel'|'miter')}
     * @default 'round'
     */
    wireframeLinejoin: ("round" | "bevel" | "miter");
    /**
     * Whether the material is rendered with flat shading or not.
     *
     * @type {boolean}
     * @default false
     */
    flatShading: boolean;
    /**
     * Whether the material is affected by fog or not.
     *
     * @type {boolean}
     * @default true
     */
    fog: boolean;
    copy(source: any): this;
}
import { Material } from './Material.js';
import { Color } from '../math/Color.js';
import { Vector2 } from '../math/Vector2.js';
import { Euler } from '../math/Euler.js';
