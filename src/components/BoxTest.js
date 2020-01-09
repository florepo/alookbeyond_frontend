import React, {useRef,useState, useEffect} from 'react'
import {render} from "react-dom"
import {Canvas, useRender} from "react-three-fiber"

const BoxTest = () =>{

    const [scale, setScale]=useState(1);

    const boxRef=useRef();

    useRender (()=>{
        boxRef.current.rotation.x +=0.01;
        boxRef.current.rotation.y +=0.02;
    })

    return (
        <mesh
            ref={boxRef}
            scale={[scale,scale,scale]}
        >
        <boxBufferGeometry args={[2,2,2]} attach="geometry" />
        <meshNormalMaterial attach="material" />
        </mesh>
    )
}

export default BoxTest
