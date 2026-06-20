export const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const liquidFragSource = `#version 300 es
precision highp float;

out vec4 outColor;
in vec2 v_uv;

uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_refraction;
uniform float u_patternScale;
uniform float u_patternBlur;
uniform float u_liquid;
uniform float u_edge;
uniform float u_ratio;
uniform float u_img_ratio;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 glassNormal(vec2 uv) {
  float t = u_time * 0.001;
  float n1 = noise(uv * u_patternScale + t * 0.6);
  float n2 = noise((uv + 12.3) * u_patternScale * 1.6 - t * 0.35);
  vec2 grad = vec2(dFdx(n1 + n2), dFdy(n1 - n2));
  return normalize(vec3(grad * u_liquid, 1.0));
}

vec2 fitImage(vec2 uv, float frameRatio, float imgRatio) {
  vec2 v = uv;
  if (frameRatio > imgRatio) {
    float scale = imgRatio / frameRatio;
    v.y = uv.y * scale + (1.0 - scale) * 0.5;
  } else {
    float scale = frameRatio / imgRatio;
    v.x = uv.x * scale + (1.0 - scale) * 0.5;
  }
  return v;
}

void main() {
  float frameRatio = u_ratio;
  float imgRatio = u_img_ratio;

  vec2 uv = fitImage(v_uv, frameRatio, imgRatio);

  vec3 normal = glassNormal(uv);

  vec2 offset = normal.xy * u_refraction;
  float ripple = noise(uv * (u_patternScale * 0.75) + u_time * 0.0009);
  offset += (ripple - 0.5) * u_patternBlur;

  vec2 sampleUv = clamp(uv + offset, 0.001, 0.999);

  vec4 tex = texture(u_image_texture, sampleUv);

  float edgeMask = smoothstep(u_edge, u_edge + 0.12, min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y)));
  float fresnel = pow(1.0 - clamp(normal.z, 0.0, 1.0), 3.0);

  vec3 caustic = vec3(0.2, 0.9, 1.05) * fresnel * 0.85;
  vec3 tint = mix(tex.rgb, tex.rgb + caustic, 0.65);
  vec3 highlight = vec3(1.0) * smoothstep(0.62, 1.0, ripple + fresnel * 0.6);
  vec3 color = tint + highlight * 0.12;

  float baseAlpha = tex.a;
  float alpha = clamp(baseAlpha * 1.35 * edgeMask + fresnel * 0.28 + 0.12, 0.0, 1.0);
  outColor = vec4(color, alpha);
}
`;
