import React, { Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";

import Sphere from "../components/Sphere";
import Cube from "../components/Cube";

import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

const ThreeDisplay = ({ sats }) => {
  console.log(sats);

  let iniPosition1 = { id: 1, x: 0.0, y: 2.0, z: 1.5 }; //
  let iniPosition2 = { id: 2, x: 0.8, y: 1.8, z: 1.2 }; //

  let positions = [iniPosition1, iniPosition2];

  console.log(positions);

  const { size, viewport } = useThree();
  const { camera } = useThree();

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[300, 300, 4000]} />
      <Suspense fallback={null}>
        <Sphere></Sphere>
        {positions.map(position => {
          console.log(position);
          return <Cube key={position.id} position={position} />;
        })}
      </Suspense>
    </Canvas>
  );
};

export default ThreeDisplay;
