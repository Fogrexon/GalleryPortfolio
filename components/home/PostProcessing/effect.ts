import {
  ShaderMaterial,
  Uniform,
} from 'three';
import { ShaderPass } from 'postprocessing';
import { wrapEffect } from '@react-three/postprocessing/util.js'
import React, { forwardRef, useMemo, useLayoutEffect, useRef } from 'react'
import { Vector2 } from 'three'
import { ReactThreeFiber } from '@react-three/fiber'
import { Effect, BlendFunction } from 'postprocessing'

const wrapEffect = <T extends new (...args: any[]) => Effect>(
  effectImpl: T,
  defaultBlendMode: BlendFunction = BlendFunction.NORMAL
) =>
  forwardRef<T, ConstructorParameters<typeof effectImpl>[0] & DefaultProps>(function Wrap(
    { blendFunction, opacity, ...props }: React.PropsWithChildren<DefaultProps & ConstructorParameters<T>[0]>,
    ref
  ) {
    const effect: Effect = useMemo(() => new effectImpl(props), [props])

    useLayoutEffect(() => {
      effect.blendMode.blendFunction = blendFunction || defaultBlendMode
      if (opacity !== undefined) effect.blendMode.opacity.value = opacity
    }, [blendFunction, effect.blendMode, opacity])
    return <primitive ref={ref} object={effect} dispose={null} />
  })

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

const PostProcessing = wrapEffect(PostProcessingShader);

export default PostProcessing;
