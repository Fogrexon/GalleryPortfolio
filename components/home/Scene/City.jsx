import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import SimplexNoise from "simplex-noise";
import { Random } from "../../utils/XorShift";

const width = 40;
const height = 40;
const pillerSize = 1.5;

export const City = ({ progress }) => {
  const meshRef = useRef();

  const tempObject = new THREE.Object3D();

  const heightList = [];
  const baseList = [];
  const random = new Random();
  const noise = new SimplexNoise(random.nextInt());

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      tempObject.position.set(
        (x - width * 0.5) * (pillerSize + 0.001),
        -4,
        (y - height * 0.5) * (pillerSize + 0.001)
      );
      const r =
        (tempObject.position.x / width / pillerSize) ** 2 +
        (tempObject.position.z / height / pillerSize) ** 2;
      baseList.push(
        tempObject.position.y +
          noise.noise2D(
            tempObject.position.x * 0.02,
            tempObject.position.z * 0.02
          ) *
            r *
            35
      );
      heightList.push(12 * Math.exp(-random.next() * 5));
    }
  }

  let flag = true;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.set(0, time * 0.2, 0);

    if (!flag) return;
    flag = false;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const id = y * width + x;
        tempObject.position.set(
          (x - width * 0.5) * (pillerSize + 0.001),
          baseList[id],
          (y - height * 0.5) * (pillerSize + 0.001)
        );
        tempObject.scale.set(
          pillerSize,
          progress * heightList[id] + 1,
          pillerSize
        );
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, width * height]}
      position={[0, -1, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshDepthMaterial />
    </instancedMesh>
  );
};

City.propTypes = {
  progress: PropTypes.number.isRequired,
};
