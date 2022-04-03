import { animated, useSpring } from "@react-spring/three";
import { useLoader } from "@react-three/fiber";
import { VFC, useMemo, useState, useEffect } from "react";
import {
  Color,
  Vector3,
  Euler,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import monolithSrc from "./monolith.glb";
import monolithUVSrc from "./monolith.png";

const EffectPlane: VFC<
  { to: Record<string, any>; visible: boolean } & Record<string, any>
> = ({ to, ...props }) => {
  const anim = useSpring({ to });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.mesh {...props} {...anim}>
      <planeBufferGeometry />
      <meshBasicMaterial transparent color={new Color(1, 0, 0)} opacity={0.5} />
    </animated.mesh>
  );
};

interface MonolithProps {
  position: Vector3;
  rotation: Euler;
}
export const Monolith: VFC<MonolithProps> = ({ position, rotation }) => {
  const monolithOrigin = useLoader(GLTFLoader, monolithSrc);
  const monolith = useMemo<Mesh | null>(
    () => (monolithOrigin.scene.children[0].clone() as Mesh) || null,
    [monolithOrigin]
  );
  const [visible, setVisible] = useState(false);
  const uv = useLoader(TextureLoader, monolithUVSrc.src);

  useEffect(() => {
    if (monolith) {
      (monolith.material as MeshStandardMaterial).emissiveMap = uv;
      (monolith.material as MeshStandardMaterial).emissive = new Color(
        0xffffff
      );
      (monolith.material as MeshStandardMaterial).color = new Color(0xdddddd);
      (monolith.material as MeshStandardMaterial).needsUpdate = true;
    }
  }, [monolithOrigin]);

  return (
    <group position={position} rotation={rotation}>
      <EffectPlane
        visible={visible}
        position={[-0.6, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible? [0, 0, 0] : [4, 1, 1] }}
      />
      <EffectPlane
        visible={visible}
        position={[-0.4, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible? [0, 0, 0] : [2.5, 2.5, 2.5] }}
      />
      <EffectPlane
        visible={visible}
        position={[-0.5, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible? [0, 0, 0] : [3, 3, 3] }}
      />
      <EffectPlane
        visible={visible}
        position={[-0.5, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible? [0, 0, 0] : [3, 3, 3] }}
      />
      <primitive
        object={monolith}
        onPointerOver={() => setVisible(true)}
        onPointerOut={() => setVisible(false)}
        receiveShadow
        castShadow
      />
    </group>
  );
};
