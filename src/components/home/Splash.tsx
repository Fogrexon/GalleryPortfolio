/* eslint-disable react/jsx-props-no-spreading */
import { useTexture } from "@react-three/drei";
import { Suspense, VFC } from "react";
import splashSrc from "./splash.png";

const shaders = {
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  fragmentShader: `
  uniform float progress;
  uniform float delta;
uniform sampler2D tex;
varying vec2 vUv;

void main() {
  float v = mod(floor(vUv.x * 20.0 - vUv.y * 20.0), 2.0);
  vec2 uv = vUv + vec2(1.0, 1.0) * (v * 2.0 - 1.0) * progress * delta;
  gl_FragColor = texture2D(tex, uv) * mix(vec4(1.0), vec4(1.0, 0.0, 0.0, 1.0), mod(v, 2.0));
}
  `,
};

export const SplashInner: VFC<Record<string, any>> = ({ ...rest }) => {
  const tex = useTexture(splashSrc.src);
  return (
    <mesh {...rest}>
      <planeBufferGeometry />
      <shaderMaterial
        transparent
        uniforms={{
          tex: { value: tex },
          progress: { value: 0.5 },
          delta: { value: 0.02 },
        }}
        {...shaders}
      />
    </mesh>
  );
};
export const Splash: VFC<Record<string, any>> = ({ ...rest }) => (
  <Suspense fallback={null}>
    <SplashInner {...rest} />
  </Suspense>
);
