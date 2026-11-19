declare const _default: "\n#if defined( USE_POINTS_UV )\n\n\tvarying vec2 vUv;\n\n#else\n\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\t\tuniform mat3 uvTransform;\n\n\t#endif\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n";
export default _default;
