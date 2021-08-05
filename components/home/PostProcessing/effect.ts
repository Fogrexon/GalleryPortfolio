import {
  ShaderMaterial,
  Uniform,
} from 'three';
import { ShaderPass } from 'postprocessing';

const PostProcessingShader: {uniforms: any, vertexShader: string, fragmentShader: string} = {
  uniforms: {
    time: { type: 'f', value: 0.0 },
    tex: new Uniform(null),
    resolution: { type: 'v2', value: null },
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
  `,
  fragmentShader: `
uniform float time;
uniform vec2 resolution;
uniform sampler2D tex;

varying vec2 vUv;

void main() {
  gl_FlagColor = texture2D(tex, vUv + sin(time) * 0.1 * vUv);
}
  `,
};

const PostProcessing = () => new ShaderPass(
  new ShaderMaterial(PostProcessingShader),
  'tex',
);

export default PostProcessing;
