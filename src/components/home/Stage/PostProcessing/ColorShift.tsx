import { BlendFunction, Effect } from "postprocessing";
import { forwardRef, useMemo } from "react";
import { Uniform } from "three";

const fragmentShader = `
uniform float weights;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

	vec4 r = texture2D(inputBuffer, uv);
	vec4 g = texture2D(inputBuffer, uv + vec2(1.0, 0.0) * weights);
	vec4 b = texture2D(inputBuffer, uv + vec2(0.0, -1.0) * weights);
	outputColor = vec4(r.r, g.g, b.b, 1.0);

}`

export class CustomEffect extends Effect {

	constructor() {

		super("CustomEffect", fragmentShader, {

			blendFunction: BlendFunction.NORMAL,
			uniforms: new Map([
				["weights", new Uniform(0.002)]
			])

		});

	}

}

export const ColorShift = forwardRef((props, ref) => {
  const effect = useMemo(() => new CustomEffect, []);
  return <primitive ref={ref} object={effect} dispose={null} />
});
