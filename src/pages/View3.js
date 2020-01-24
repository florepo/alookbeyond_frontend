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
        API.getWatchlist(110)
        .then(watchlist => this.setState({watchlist: watchlist.satellites}))
    }

    render() { 
        return (  
            <div className="App">
                {(this.state.watchlist!=[])?
                (<ARContainer
                    ARview={this.state.ARview}
                    sats={this.state.watchlist}
                />)
                : <div>no constellation selected</div>
                }
            </div>
             );
    }
}
 
export default DemoPage;