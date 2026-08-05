declare const _default: "\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n";
export default _default;
