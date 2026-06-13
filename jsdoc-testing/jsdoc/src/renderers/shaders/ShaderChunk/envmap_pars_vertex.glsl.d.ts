declare const _default: "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n";
export default _default;
