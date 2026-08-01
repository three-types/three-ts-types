declare const _default: "\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n\n#endif\n";
export default _default;
