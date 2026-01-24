import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

import examplesFiles from '../three.js/examples/files.json' with { type: 'json' };

const exceptionList = [
    'misc_exporter_gcode',
    'misc_raycaster_helper',
    'webgl_animation_skinning_blending',
    'webgl_animation_skinning_additive_blending',
    'webgl_animation_skinning_ik',
    'webgl_batch_lod_bvh',
    'webgl_depth_texture',
    'webgl_geometry_csg',
    'webgl_geometry_spline_editor',
    'webgl_loader_collada_kinematics',
    'webgl_loader_gltf_variants',
    'webgl_loader_ifc',
    'webgl_loader_ldraw',
    'webgl_loader_md2',
    'webgl_loader_nrrd',
    'webgl_loader_stl',
    'webgl_loader_texture_exr',
    'webgl_loader_texture_hdr',
    'webgl_loader_texture_ktx2',
    'webgl_loader_texture_lottie',
    'webgl_loader_texture_pvrtc',
    'webgl_materials_channels',
    'webgl_materials_matcap',
    'webgl_materials_normalmap',
    'webgl_materials_subsurface_scattering',
    'webgl_modifier_curve',
    'webgl_modifier_curve_instanced',
    'webgl_modifier_subdivision',
    'webgl_morphtargets_webcam',
    'webgl_multiple_elements_text',
    'webgl_points_dynamic',
    'webgl_postprocessing_godrays',
    'webgl_raycaster_bvh',
    'webgl_renderer_pathtracer',
    'webgl_reversed_depth_buffer',
    'webgl_postprocessing_3dlut',
    'webgl_postprocessing_dof',
    'webgl_postprocessing_dof2',
    'webgl_rendertarget_texture2darray',
    'webgl_texture2darray',
    'webgl_worker_offscreencanvas',
    'webgpu_compute_geometry',
    'webgpu_compute_particles',
    'webgpu_compute_particles_fluid',
    'webgpu_compute_particles_rain',
    'webgpu_compute_reduce',
    'webgpu_compute_water',
    'webgpu_depth_texture',
    'webgpu_instance_sprites',
    'webgpu_instance_uniform',
    'webgpu_lights_custom',
    'webgpu_lights_projector',
    'webgpu_materials',
    'webgpu_reflection_blurred',
    'webgpu_sandbox',
    'webgpu_shadertoy',
    'webgpu_shadowmap_opacity',
    'webgpu_skinning_points',
    'webgpu_tsl_compute_attractors_particles',
    'webgpu_tsl_editor',
    'webgpu_tsl_transpiler',
    'webgpu_video_frame',
    'webxr_ar_camera_access',
    'webxr_vr_handinput_cubes',
    'webxr_vr_handinput_profiles',
    'webxr_vr_handinput_pointerclick',
    'webxr_vr_handinput_pointerdrag',
    'webxr_vr_handinput_pressbutton',
    'webxr_vr_layers',
    'webxr_vr_teleport',
    'webxr_xr_ballshooter',
    'webxr_xr_cubes',
    'webxr_xr_dragging',
    'webxr_xr_haptics',
    'webxr_xr_paint',
    'webxr_xr_sculpt',
    'physics_ammo_break',
    'physics_ammo_cloth',
    'physics_ammo_rope',
    'physics_ammo_terrain',
    'physics_ammo_volume',
];

const re = /<script type="module">((.|\r|\n)+)<\/script>/;

const inDir = '../three.js/examples';
const outDir = './examples';

const allExamples = Object.values(examplesFiles).flat();

const unrecognizedExamples = exceptionList.filter(example => !allExamples.includes(example));
if (unrecognizedExamples.length) {
    throw new Error(`Unrecognized example(s): ${unrecognizedExamples.join(', ')}`);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

for (const section of Object.values(examplesFiles)) {
    for (const file of section) {
        if (exceptionList.includes(file)) continue;
        console.log(file);
        const fileContents = fs.readFileSync(path.join(inDir, `${file}.html`), {
            encoding: 'utf-8',
        });
        const results = re.exec(fileContents);
        const options = await prettier.resolveConfig(file);
        const formattedFile = await prettier.format(results[1], { ...options, parser: 'babel' });
        fs.writeFileSync(path.join(outDir, `${file}.ts`), formattedFile);
    }
}
