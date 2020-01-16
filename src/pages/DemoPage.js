import React, { Component } from 'react'

import ARContainer from '../containers/ARContainer'
import * as API from '../adapters/api' 

class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ARview: true,
                       watchlist: [] }
      }
    
      handleClick= () =>{
        console.log("clicked")
        this.setState({ARview: !this.state.ARview})
      }

    componentDidMount() {
        API.getConstellationSats(4)
        .then(watchlist => this.setState({watchlist: watchlist.satellites}))
    }

    render() { 
        return (  
            <div className="App">
                <button onClick={this.handleClick}> 3D/AR </button>
                <ARContainer
                    ARview={this.state.ARview}
                    sats={this.state.watchlist}
                />
            </div>
             );
    }
}
 
export default DemoPage;