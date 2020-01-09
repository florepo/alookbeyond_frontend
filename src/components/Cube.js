import { Canvas, useFrame } from 'react-three-fiber'
import React, { Component, useRef } from 'react';


const Cube = ({position}) => {
  
  const ref = useRef()

  useFrame ( () => ref.current.rotation.x = ref.current.rotation.y += 0.01 )
  
    return (
        <mesh
          ref={ref}
          

          position={[position.x, position.y, position.z]}
        //   // onClick={e => console.log('click')}
        //   // onPointerOver={e => console.log('hover')}
        //   // onPointerOut={e => console.log('unhover')}
        >
        <boxBufferGeometry
          attach="geometry"
          args={[0.5, 0.5, 0.5]} />
        <meshNormalMaterial attach="material" />
        </mesh>
  )
}

export default Cube;