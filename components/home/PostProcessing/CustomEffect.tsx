/* eslint-disable react/forbid-prop-types */
import React, { forwardRef, useMemo } from "react";
import { Effect, BlendFunction, EffectAttribute } from "postprocessing";
import { PrimitiveProps } from "@react-three/fiber";

const fragmentShader = `
#ifdef FRAMEBUFFER_PRECISION_HIGH

  uniform mediump sampler2D map;

#else

  uniform lowp sampler2D map;

#endif

uniform float progress;
uniform float aspect;
uniform float time;

// GodRay
float godrayCount = 100.0;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
  return  (sin(p * 0.367) * 0.2
        + sin(p * 0.93) * 0.02
        + sin(p * 5.37) * 0.02
        + sin(p * 0.45) * 0.15
        + sin(p * 10.34) * 0.01
        + sin(p * 0.563) * 0.01
        + sin(p * 1.2355) * 0.01) / 0.5 * 0.2
        + 0.8;
}

float atan2(in float y, in float x){
  return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {

  float d = inputColor.r;
  // front
  vec3 fadeColor = mix(vec3(86.0, 166.0, 40.0) / 256.0, vec3(204, 255, 251) / 256.0, progress);
  vec3 baseColor = mix(vec3(64.0, 176.0, 0.0) / 256.0, vec3(1.0, 1.0, 1.0) * 0.3, progress);

  vec3 frontColor = mix(fadeColor, baseColor, 1.0 - exp(- d * 50.0));

  // godray

  vec2 normUv = uv / vec2(1.0, aspect);
  vec2 center = vec2(1.0, 1.0 / aspect) * vec2(0.9, 0.9);

  float acc = 0.0;
  vec2 delta = (center - normUv) / godrayCount;
  for (float i=0.0;i<godrayCount;i++) {
    float d2 = texture2D(inputBuffer,
      (normUv + delta * i) * vec2(1.0, aspect)
    ).r;
    acc += (1.0 - step(0.01, d2)) / godrayCount;
  }

  acc *= noise(atan2(delta.y, delta.x) * 10.0 + time * 0.1);

  // back

  vec3 skyColor = vec3(4, 25, 56) / 256.0;
  vec3 sunColor = mix(vec3(255, 185, 71) / 256.0, skyColor, step(0.01, d));
  vec3 backColor = mix(sunColor, skyColor, step(0.02, distance(normUv, center)));

  vec3 color = mix(backColor, frontColor, mix(0.0, 1.0, min(1.0, d * 30.0))) + vec3(255, 185, 71) / 256.0 * acc * 0.2;

  outputColor = vec4(color, inputColor.a);

}
`;

// Effect implementation
class MyCustomEffectImpl extends Effect {
  constructor(uniforms) {
    super("MyCustomEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      attributes: EffectAttribute.DEPTH,
      uniforms,
    });
  }

  // update(renderer, inputBuffer, deltaTime) {
  // }
}

type MyCustomEffectProps = {
  uniforms: Map<string, any>;
};

// Effect component
export const MyCustomEffect = forwardRef<PrimitiveProps, MyCustomEffectProps>(
  ({ uniforms }, ref) => {
    const effect = useMemo(() => new MyCustomEffectImpl(uniforms), [uniforms]);
    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);
