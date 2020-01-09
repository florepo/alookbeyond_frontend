import { Canvas,  useFrame, useLoader } from "react-three-fiber";
import React, { Component, useRef, Suspense,} from "react";
import * as THREE from "three";
import earthImg from "../images/surface.jpeg";
import bumpImg from "../images/bump.jpeg";

const Sphere = () => {

  const ref = useRef();
  console.log(ref.current);

  const [texture, bump] = useLoader(THREE.TextureLoader, [earthImg, bumpImg]);

  useFrame(() => (ref.current.rotation.y += 0.01));
  
  return (
    <Suspense fallback={null}>
      <mesh
        ref={ref}
        position={[0, 0, 0]}
        //   // onClick={e => console.log('click')}
        //   // onPointerOver={e => console.log('hover')}
        //   // onPointerOut={e => console.log('unhover')}
      >
          {/* {
              props.orbitData.map(orbit => <Orbit />)
          } */}
        <sphereGeometry attach="geometry" args={[2, 22, 22]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          bumpMap={bump}
          bumpScale={0.05}
        />
      </mesh>
    </Suspense>
  );
};

export default Sphere;
