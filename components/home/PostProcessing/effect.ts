import {
  Mesh, OrthographicCamera, PlaneBufferGeometry, Scene, ShaderMaterial, UniformsUtils, Vector2,
} from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';

const PostProcessingShader: {uniforms: any, vertexShader: string, fragmentShader: string} = {
  uniforms: {
    time: { type: 'f', value: 0.0 },
    tex: { type: 't', value: null },
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
  gl_FlagColor = texture2D(tex, vUv);
}
  `,
};

class PostProcessing extends Pass {
  private uniforms: any;
  private dtSize: number;

  private material: ShaderMaterial;

  private camera: OrthographicCamera;

  private quad: Mesh;

  private scene: Scene;

  private time: number;

  constructor(_dtSize: number) {
    super();
    const shader = PostProcessingShader;
    this.uniforms = UniformsUtils.clone(shader.uniforms);
    this.dtSize = _dtSize || 64;
    this.uniforms.resolution.value = new Vector2(this.dtSize, this.dtSize);
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    });
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();
    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
    this.time = 0;
  }
}

export default PostProcessing;
