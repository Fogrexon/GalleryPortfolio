/* eslint-disable react/jsx-props-no-spreading */
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef, VFC } from "react";
import { ShaderMaterial } from "three";
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
  float p = exp(-progress * 4.0);
  vec2 uv = vUv + vec2(1.0, 1.0) * (v * 2.0 - 1.0) * (1.0 - p) * delta;
  gl_FragColor = texture2D(tex, uv) * vec4(1.0, 1.0, 1.0, clamp(0.0, 1.0, p));
}
  `,
};

export const SplashInner: VFC<Record<string, any>> = ({ ...rest }) => {
  const tex = useTexture(splashSrc.src);
  const t = useRef(0);
  const matRef = useRef<ShaderMaterial>(null)

  useFrame((_, delta) => {
    if (!matRef.current) return;
    t.current += delta;
    // console.clear()
    matRef.current.uniforms.progress.value = Math.max(0.0, t.current - 2.0);
  })
  return (
    <mesh {...rest}>
      <planeBufferGeometry />
      <shaderMaterial
        ref={matRef}
        transparent
        uniforms={{
          tex: { value: tex },
          progress: { value: 0 },
          delta: { value: 0.05 },
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
