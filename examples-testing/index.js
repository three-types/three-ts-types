import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = {
    webgl: [
        'webgl_animation_keyframes',
        // 'webgl_animation_skinning_blending',
        // 'webgl_animation_skinning_additive_blending',
        // 'webgl_animation_skinning_ik',
        'webgl_animation_skinning_morph',
        'webgl_animation_multiple',
        'webgl_camera',
        // 'webgl_camera_array',
        // 'webgl_camera_cinematic',
        'webgl_camera_logarithmicdepthbuffer',
        'webgl_clipping',
        'webgl_clipping_advanced',
        'webgl_clipping_intersection',
        'webgl_clipping_stencil',
        'webgl_decals',
        'webgl_depth_texture',
        'webgl_effects_anaglyph',
        'webgl_effects_ascii',
        'webgl_effects_parallaxbarrier',
        'webgl_effects_peppersghost',
        'webgl_effects_stereo',
        'webgl_framebuffer_texture',
        'webgl_geometries',
        'webgl_geometries_parametric',
        // 'webgl_geometry_colors',
        // 'webgl_geometry_colors_lookuptable',
        // 'webgl_geometry_convex',
        // 'webgl_geometry_csg',
        // 'webgl_geometry_cube',
        // 'webgl_geometry_dynamic',
        // 'webgl_geometry_extrude_shapes',
        // 'webgl_geometry_extrude_splines',
        // 'webgl_geometry_minecraft',
        // 'webgl_geometry_nurbs',
        // 'webgl_geometry_shapes',
        // 'webgl_geometry_spline_editor',
        // 'webgl_geometry_teapot',
        // 'webgl_geometry_terrain',
        // 'webgl_geometry_terrain_raycast',
        // 'webgl_geometry_text',
        // 'webgl_geometry_text_shapes',
        // 'webgl_geometry_text_stroke',
        // 'webgl_helpers',
        // 'webgl_instancing_dynamic',
        // 'webgl_instancing_performance',
        // 'webgl_instancing_raycast',
        // 'webgl_instancing_scatter',
        // 'webgl_interactive_buffergeometry',
        // 'webgl_interactive_cubes',
        // 'webgl_interactive_cubes_gpu',
        // 'webgl_interactive_cubes_ortho',
        // 'webgl_interactive_lines',
        // 'webgl_interactive_points',
        // 'webgl_interactive_raycasting_points',
        // 'webgl_interactive_voxelpainter',
        // 'webgl_layers',
        // 'webgl_lensflares',
        // 'webgl_lightprobe',
        // 'webgl_lightprobe_cubecamera',
        // 'webgl_lights_hemisphere',
        // 'webgl_lights_physical',
        // 'webgl_lights_pointlights',
        // 'webgl_lights_spotlight',
        // 'webgl_lights_spotlights',
        // 'webgl_lights_rectarealight',
        // 'webgl_lines_colors',
        // 'webgl_lines_dashed',
        // 'webgl_lines_fat',
        // 'webgl_lines_fat_raycasting',
        // 'webgl_lines_fat_wireframe',
        // 'webgl_loader_3dm',
        // 'webgl_loader_3ds',
        // 'webgl_loader_3mf',
        // 'webgl_loader_3mf_materials',
        // 'webgl_loader_amf',
        // 'webgl_loader_bvh',
        // 'webgl_loader_collada',
        // 'webgl_loader_collada_kinematics',
        // 'webgl_loader_collada_skinning',
        // 'webgl_loader_draco',
        // 'webgl_loader_fbx',
        // 'webgl_loader_fbx_nurbs',
        // 'webgl_loader_gcode',
        // 'webgl_loader_gltf',
        // 'webgl_loader_gltf_avif',
        // 'webgl_loader_gltf_compressed',
        // 'webgl_loader_gltf_instancing',
        // 'webgl_loader_gltf_iridescence',
        // 'webgl_loader_gltf_lights',
        // 'webgl_loader_gltf_sheen',
        // 'webgl_loader_gltf_transmission',
        // 'webgl_loader_gltf_variants',
        // 'webgl_loader_gltf_anisotropy',
        // 'webgl_loader_ifc',
        // 'webgl_loader_imagebitmap',
        // 'webgl_loader_kmz',
        // 'webgl_loader_ldraw',
        // 'webgl_loader_lwo',
        // 'webgl_loader_md2',
        // 'webgl_loader_md2_control',
        // 'webgl_loader_mdd',
        // 'webgl_loader_mmd',
        // 'webgl_loader_mmd_pose',
        // 'webgl_loader_mmd_audio',
        // 'webgl_loader_nrrd',
        // 'webgl_loader_obj',
        // 'webgl_loader_obj_mtl',
        // 'webgl_loader_pcd',
        // 'webgl_loader_pdb',
        // 'webgl_loader_ply',
        // 'webgl_loader_stl',
        // 'webgl_loader_svg',
        // 'webgl_loader_tilt',
        // 'webgl_loader_texture_dds',
        // 'webgl_loader_texture_exr',
        // 'webgl_loader_texture_hdr',
        // 'webgl_loader_texture_ktx',
        // 'webgl_loader_texture_ktx2',
        // 'webgl_loader_texture_logluv',
        // 'webgl_loader_texture_lottie',
        // 'webgl_loader_texture_pvrtc',
        // 'webgl_loader_texture_rgbm',
        // 'webgl_loader_texture_tga',
        // 'webgl_loader_texture_tiff',
        // 'webgl_loader_ttf',
        // 'webgl_loader_usdz',
        // 'webgl_loader_vox',
        // 'webgl_loader_vrml',
        // 'webgl_loader_vtk',
        // 'webgl_loader_xyz',
        // 'webgl_lod',
        // 'webgl_marchingcubes',
        // 'webgl_materials_alphahash',
        // 'webgl_materials_blending',
        // 'webgl_materials_blending_custom',
        // 'webgl_materials_bumpmap',
        // 'webgl_materials_car',
        // 'webgl_materials_channels',
        // 'webgl_materials_cubemap',
        // 'webgl_materials_cubemap_dynamic',
        // 'webgl_materials_cubemap_refraction',
        // 'webgl_materials_cubemap_mipmaps',
        // 'webgl_materials_curvature',
        // 'webgl_materials_displacementmap',
        // 'webgl_materials_envmaps',
        // 'webgl_materials_envmaps_exr',
        // 'webgl_materials_envmaps_groundprojected',
        // 'webgl_materials_envmaps_hdr',
        // 'webgl_materials_lightmap',
        // 'webgl_materials_matcap',
        // 'webgl_materials_normalmap',
        // 'webgl_materials_normalmap_object_space',
        // 'webgl_materials_physical_clearcoat',
        // 'webgl_materials_physical_transmission',
        // 'webgl_materials_physical_transmission_alpha',
        // 'webgl_materials_subsurface_scattering',
        // 'webgl_materials_texture_anisotropy',
        // 'webgl_materials_texture_canvas',
        // 'webgl_materials_texture_filters',
        // 'webgl_materials_texture_manualmipmap',
        // 'webgl_materials_texture_partialupdate',
        // 'webgl_materials_texture_rotation',
        // 'webgl_materials_toon',
        // 'webgl_materials_video',
        // 'webgl_materials_video_webcam',
        // 'webgl_materials_wireframe',
        // 'webgl_math_obb',
        // 'webgl_math_orientation_transform',
        // 'webgl_mirror',
        // 'webgl_modifier_curve',
        // 'webgl_modifier_curve_instanced',
        // 'webgl_modifier_edgesplit',
        // 'webgl_modifier_simplifier',
        // 'webgl_modifier_subdivision',
        // 'webgl_modifier_tessellation',
        // 'webgl_morphtargets',
        // 'webgl_morphtargets_face',
        // 'webgl_morphtargets_horse',
        // 'webgl_morphtargets_sphere',
        // 'webgl_morphtargets_webcam',
        // 'webgl_multiple_elements',
        // 'webgl_multiple_elements_text',
        // 'webgl_multiple_scenes_comparison',
        // 'webgl_multiple_views',
        // 'webgl_panorama_cube',
        // 'webgl_panorama_equirectangular',
        // 'webgl_points_billboards',
        // 'webgl_points_dynamic',
        // 'webgl_points_sprites',
        // 'webgl_points_waves',
        // 'webgl_portal',
        // 'webgl_raycaster_bvh',
        // 'webgl_raycaster_sprite',
        // 'webgl_raycaster_texture',
        // 'webgl_read_float_buffer',
        // 'webgl_renderer_pathtracer',
        // 'webgl_refraction',
        // 'webgl_rtt',
        // 'webgl_shader',
        // 'webgl_shader_lava',
        // 'webgl_shaders_ocean',
        // 'webgl_shaders_sky',
        // 'webgl_shadow_contact',
        // 'webgl_shadowmap',
        // 'webgl_shadowmap_performance',
        // 'webgl_shadowmap_pointlight',
        // 'webgl_shadowmap_viewer',
        // 'webgl_shadowmap_vsm',
        // 'webgl_shadowmesh',
        // 'webgl_sprites',
        // 'webgl_test_memory',
        // 'webgl_test_memory2',
        // 'webgl_tonemapping',
        // 'webgl_video_kinect',
        // 'webgl_video_panorama_equirectangular',
        // 'webgl_water',
        // 'webgl_water_flowmap',
    ],
    'webgl / nodes': [
        // 'webgl_nodes_loader_gltf_iridescence',
        // 'webgl_nodes_loader_gltf_transmission',
        // 'webgl_nodes_loader_gltf_sheen',
        // 'webgl_nodes_loader_materialx',
        // 'webgl_nodes_materials_instance_uniform',
        // 'webgl_nodes_materials_physical_clearcoat',
        // 'webgl_nodes_materials_standard',
        // 'webgl_nodes_materialx_noise',
        // 'webgl_nodes_points',
    ],
    'webgl / postprocessing': [
        'webgl_postprocessing',
        // 'webgl_postprocessing_3dlut',
        'webgl_postprocessing_advanced',
        'webgl_postprocessing_afterimage',
        'webgl_postprocessing_backgrounds',
        'webgl_postprocessing_crossfade',
        // 'webgl_postprocessing_dof',
        // 'webgl_postprocessing_dof2',
        'webgl_postprocessing_fxaa',
        'webgl_postprocessing_glitch',
        'webgl_postprocessing_godrays',
        'webgl_postprocessing_rgb_halftone',
        'webgl_postprocessing_masking',
        'webgl_postprocessing_ssaa',
        'webgl_postprocessing_outline',
        'webgl_postprocessing_pixel',
        'webgl_postprocessing_procedural',
        'webgl_postprocessing_sao',
        'webgl_postprocessing_smaa',
        'webgl_postprocessing_sobel',
        'webgl_postprocessing_ssao',
        'webgl_postprocessing_ssr',
        'webgl_postprocessing_taa',
        'webgl_postprocessing_unreal_bloom',
        'webgl_postprocessing_unreal_bloom_selective',
    ],
    'webgl / advanced': [
        'webgl_buffergeometry',
        // 'webgl_buffergeometry_compression',
        'webgl_buffergeometry_custom_attributes_particles',
        'webgl_buffergeometry_drawrange',
        'webgl_buffergeometry_glbufferattribute',
        'webgl_buffergeometry_indexed',
        'webgl_buffergeometry_instancing',
        'webgl_buffergeometry_instancing_billboards',
        'webgl_buffergeometry_instancing_interleaved',
        'webgl_buffergeometry_lines',
        'webgl_buffergeometry_lines_indexed',
        'webgl_buffergeometry_points',
        'webgl_buffergeometry_points_interleaved',
        'webgl_buffergeometry_rawshader',
        'webgl_buffergeometry_selective_draw',
        'webgl_buffergeometry_uint',
        'webgl_custom_attributes',
        'webgl_custom_attributes_lines',
        'webgl_custom_attributes_points',
        'webgl_custom_attributes_points2',
        'webgl_custom_attributes_points3',
        'webgl_gpgpu_birds',
        'webgl_gpgpu_birds_gltf',
        'webgl_gpgpu_water',
        'webgl_gpgpu_protoplanet',
        'webgl_materials_modified',
        'webgl_raymarching_reflect',
        'webgl_shadowmap_csm',
        'webgl_shadowmap_pcss',
        'webgl_shadowmap_progressive',
        'webgl_simple_gi',
        // 'webgl_worker_offscreencanvas',
    ],
    webgl2: [
        'webgl2_buffergeometry_attributes_integer',
        'webgl2_buffergeometry_attributes_none',
        // 'webgl2_materials_texture2darray',
        'webgl2_materials_texture3d',
        'webgl2_materials_texture3d_partialupdate',
        'webgl2_multiple_rendertargets',
        'webgl2_multisampled_renderbuffers',
        // 'webgl2_rendertarget_texture2darray',
        'webgl2_texture2darray_compressed',
        'webgl2_ubo',
        'webgl2_volume_cloud',
        'webgl2_volume_instancing',
        'webgl2_volume_perlin',
    ],
    webgpu: [
        // 'webgpu_audio_processing',
        // 'webgpu_backdrop',
        // 'webgpu_backdrop_area',
        // 'webgpu_clearcoat',
        // 'webgpu_compute',
        // 'webgpu_cubemap_adjustments',
        // 'webgpu_cubemap_dynamic',
        // 'webgpu_cubemap_mix',
        // 'webgpu_depth_texture',
        // 'webgpu_equirectangular',
        // 'webgpu_instance_mesh',
        // 'webgpu_instance_uniform',
        // 'webgpu_lights_custom',
        // 'webgpu_lights_ies_spotlight',
        // 'webgpu_lights_phong',
        // 'webgpu_lights_selective',
        // 'webgpu_loader_gltf',
        // 'webgpu_loader_gltf_compressed',
        // 'webgpu_loader_gltf_sheen',
        // 'webgpu_materials',
        // 'webgpu_materials_video',
        // 'webgpu_morphtargets',
        // 'webgpu_particles',
        // 'webgpu_rtt',
        // 'webgpu_sandbox',
        // 'webgpu_shadowmap',
        // 'webgpu_skinning',
        // 'webgpu_skinning_instancing',
        // 'webgpu_skinning_points',
        // 'webgpu_sprites',
        // 'webgpu_tsl_editor',
        // 'webgpu_video_panorama',
    ],
    webaudio: ['webaudio_orientation', 'webaudio_sandbox', 'webaudio_timing', 'webaudio_visualizer'],
    webxr: [
        'webxr_ar_cones',
        'webxr_ar_hittest',
        'webxr_ar_lighting',
        'webxr_ar_plane_detection',
        'webxr_vr_handinput',
        // 'webxr_vr_handinput_cubes',
        // 'webxr_vr_handinput_profiles',
        // 'webxr_vr_handinput_pointerclick',
        // 'webxr_vr_handinput_pointerdrag',
        // 'webxr_vr_handinput_pressbutton',
        // 'webxr_vr_layers',
        'webxr_vr_panorama',
        'webxr_vr_panorama_depth',
        'webxr_vr_rollercoaster',
        'webxr_vr_sandbox',
        // 'webxr_vr_teleport',
        'webxr_vr_video',
        // 'webxr_xr_ballshooter',
        // 'webxr_xr_cubes',
        // 'webxr_xr_dragging',
        // 'webxr_xr_haptics',
        // 'webxr_xr_paint',
        // 'webxr_xr_sculpt',
    ],
    games: ['games_fps'],
    physics: [
        // 'physics_ammo_break',
        // 'physics_ammo_cloth',
        'physics_ammo_instancing',
        // 'physics_ammo_rope',
        // 'physics_ammo_terrain',
        // 'physics_ammo_volume',
        'physics_rapier_instancing',
    ],
    misc: [
        'misc_animation_groups',
        'misc_animation_keys',
        'misc_boxselection',
        'misc_controls_arcball',
        'misc_controls_drag',
        'misc_controls_fly',
        'misc_controls_map',
        'misc_controls_orbit',
        'misc_controls_pointerlock',
        'misc_controls_trackball',
        'misc_controls_transform',
        'misc_exporter_draco',
        'misc_exporter_gltf',
        'misc_exporter_obj',
        'misc_exporter_ply',
        'misc_exporter_stl',
        'misc_exporter_usdz',
        'misc_lookat',
    ],
    css2d: ['css2d_label'],
    css3d: [
        'css3d_molecules',
        'css3d_orthographic',
        'css3d_periodictable',
        'css3d_sandbox',
        'css3d_sprites',
        'css3d_youtube',
    ],
    svg: ['svg_lines', 'svg_sandbox'],
    tests: ['webgl_furnace_test', 'webgl_pmrem_test', 'misc_uv_tests'],
};

const re = /<script type="module">((.|\r|\n)+)<\/script>/;

const inDir = '../three.js/examples';
const outDir = './examples';

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

for (const section of Object.values(files)) {
    for (const file of section) {
        console.log(file);
        const fileContents = fs.readFileSync(path.join(inDir, `${file}.html`), {
            encoding: 'utf-8',
        });
        const results = re.exec(fileContents);
        const options = await prettier.resolveConfig(file);
        const formattedFile = prettier.format(results[1], { ...options, parser: 'babel' });
        fs.writeFileSync(path.join(outDir, `${file}.ts`), formattedFile);
    }
}
