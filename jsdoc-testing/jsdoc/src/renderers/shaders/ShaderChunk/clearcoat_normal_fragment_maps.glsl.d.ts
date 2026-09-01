declare const _default: "\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n\n#endif\n";
export default _default;
