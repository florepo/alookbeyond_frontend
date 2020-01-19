import React, { Component } from 'react'

import NavBar from '../containers/NavBar'
import MainDisplay from '../containers/MainDisplay'
import Footer from '../containers/Footer'

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
                    className="main-page"
                    watchlist={this.state.watchlist}
                    addSatToWatchList={this.addToWatchlist}  
                    removeSat={this.removeFromWatchlist} 
                />
                <Footer className="footer" />
            </div>
        )
    }
}
 
export default MainPage;