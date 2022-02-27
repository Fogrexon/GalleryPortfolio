#define PI 3.141592653589

uniform float u_time;
uniform float u_timescale;
uniform float u_alpha;
uniform sampler2D  u_tex;
varying vec2 v_uv;

vec2 rotate(vec2 pos, float rot) {
  float c = cos(rot);
  float s = sin(rot);
  return pos * mat2(c, s, -s, c);
}

void main() {
    vec4 color = texture2D(u_tex, mod(rotate(v_uv, PI * 0.1) + vec2(u_time * 0.1 * u_timescale, 0.0) + vec2(0, 0.15), 1.0));
    color *= vec4(1.5, 1.5, 1.5, u_alpha);
    
    gl_FragColor = color;
}