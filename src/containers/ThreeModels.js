import React, { Component,Suspense } from 'react'

import Sphere from '../components/Sphere'


class ThreeModels extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Suspense fallback={null}>
                <Sphere />
            </Suspense>
         );
    }
}
 
export default ThreeModels;