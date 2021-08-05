/* eslint-disable import/prefer-default-export */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const lerp = (progress, values) => {
  const num = values.length;
  const level = Math.min(Math.floor(progress * (num - 1)), num - 2);
  const exProgress = (progress * num - level);
  return [
    values[level][0] * (1 - exProgress) + values[level + 1][0] * exProgress,
    values[level][1] * (1 - exProgress) + values[level + 1][1] * exProgress,
    values[level][2] * (1 - exProgress) + values[level + 1][2] * exProgress,
  ];
};

export const Box = ({ index, progress }) => {
  const ref = useRef({});

  const rotationList = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const positionList = [
    [(index % 5) - 2.5, Math.floor(index / 5) - 2.5, 0],
    [
      Math.cos((index / 7) * Math.PI * 2) * 2,
      index / 25 - 0.5,
      Math.sin((index / 7) * Math.PI * 2) * 2,
    ],
    [Math.cos((index / 25) * Math.PI * 2) * 3, Math.sin((index / 25) * Math.PI * 2) * 3, 0],
  ];
  return (
    <mesh
      rotation={lerp(progress, rotationList)}
      position={lerp(progress, positionList)}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
Box.propTypes = {
  index: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};
