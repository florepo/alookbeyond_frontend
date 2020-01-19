import React, { Component } from 'react'

import NavBar from '../containers/NavBar'
import MainDisplay from '../containers/MainDisplay'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {watchlist: []
                    }
      }

    render() { 
        return (
            <div>
                <NavBar className="navbar"/>
                <MainDisplay
                    className="MainDisplay"
                    watchlist={this.state.watchlist}
                    addSatToWatchList={this.addToWatchlist}  
                    removeSat={this.removeFromWatchlist} 
                />         
            </div>
        )
    }
}
 
export default MainPage;