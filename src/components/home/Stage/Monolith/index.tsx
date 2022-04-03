import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { VFC, useMemo, useState, useEffect } from "react";
import {
  Color,
  Vector3,
  Euler,
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import monolithSrc from "./monolith.glb";
import ringSrc from "./ring.png";
import ringDashedSrc from "./ring-dashed.png";
import { EffectPlane, IconPlane, NamePlane } from "./Planes";

interface MonolithProps {
  position: Vector3;
  rotation: Euler;
  textureSrc: string;
  textSrc: string;
  iconSrc: string;
  onClick: () => void;
}
export const Monolith: VFC<MonolithProps> = ({
  position,
  rotation,
  textureSrc,
  textSrc,
  iconSrc,
  onClick,
}) => {
  const monolithOrigin = useLoader(GLTFLoader, monolithSrc);
  const monolithGeometry = useMemo<BufferGeometry | null>(
    () =>
      ((
        monolithOrigin.scene.children[0] as Mesh
      ).geometry.clone() as BufferGeometry) || null,
    [monolithOrigin]
  );
  const monolithMaterial = useMemo<MeshStandardMaterial | null>(
    () =>
      (
        (monolithOrigin.scene.children[0] as Mesh)
          .material as MeshStandardMaterial
      ).clone() || null,
    [monolithOrigin]
  );
  const [visible, setVisible] = useState(false);
  const uv = useTexture(textureSrc);

  useEffect(() => {
    if (monolithMaterial) {
      monolithMaterial.emissiveMap = uv;
      monolithMaterial.emissive = new Color(0xffffff);
      monolithMaterial.color = new Color(0xdddddd);
      monolithMaterial.needsUpdate = true;
    }
  }, [monolithOrigin]);

  return (
    <group position={position} rotation={rotation}>
      <EffectPlane
        visible={visible}
        position={[-0.4, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible ? [0.5, 0.5, 0.5] : [2.5, 2.5, 2.5] }}
        speed={-1}
        textureSrc={ringSrc.src}
      />
      <EffectPlane
        visible={visible}
        position={[-0.7, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible ? [1, 1, 1] : [3, 3, 3] }}
        speed={1}
        textureSrc={ringDashedSrc.src}
      />
      <IconPlane
        visible={visible}
        position={[-1, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible ? [0, 0, 0] : [2, 2, 2] }}
        textureSrc={iconSrc}
      />
      <NamePlane
        visible={visible}
        position={[-1, 0, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        to={{ scale: !visible ? [0, 0, 0] : [4, 1, 1] }}
        textureSrc={textSrc}
      />
      <mesh
        material={monolithMaterial}
        geometry={monolithGeometry}
        onPointerOver={() => setVisible(true)}
        onPointerOut={() => setVisible(false)}
        receiveShadow
        castShadow
        onClick={onClick}
      />
    </group>
  );
};
