import React, { Component } from 'react'
import { Canvas } from 'react-three-fiber';
import ThreeModels from "./ThreeModels";

class ThreeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight intensity={0.5} position={[300, 300, 4000]} />
                <ThreeModels />
            </Canvas>
         );
    }
}
 
export default ThreeDisplay;