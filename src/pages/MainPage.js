import React, { Component } from 'react'

import NavBar from '../containers/NavBar'
import MainDisplay from '../containers/MainDisplay'
import Footer from '../containers/Footer'

import * as API from '../adapters/api'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {loadedView: []
                    }
      }

    handleItemClick = (id) => {
        console.log("watchlist clicked", id)
        API.getWatchlist(id).then(watchlist => this.setState({loadedView: watchlist}))
    }

    render() { 
        return (
            <div>
                <NavBar className="navbar"
                   onClick={this.handleItemClick}
                />
                <MainDisplay
                    className="main-page"
                    loadedView={this.state.loadedView}
                    addSatToWatchList={this.addToWatchlist}  
                    removeSat={this.removeFromWatchlist} 
                />
                <Footer className="footer" />
            </div>
        )
    }
}
 
export default MainPage;