import React, { Component } from 'react'
import { Canvas } from 'react-three-fiber';
import ThreeModels from "./ThreeModels";
import BoxTest from "../components/BoxTest";
import { useThree } from 'react-three-fiber'

const ThreeDisplay =() => {


    const {size,viewport} = useThree()
    const {camera} = useThree()

        return ( 
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight intensity={0.5} position={[300, 300, 4000]} />
                <ThreeModels />
            </Canvas>
         );

}
 
export default ThreeDisplay;