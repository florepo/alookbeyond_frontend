import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

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
                <NavBar />
                <MainDisplay className="MainDisplay"
                    watchlist={this.state.watchlist}
                    addSatToWatchList={this.addToWatchlist}  
                    removeSat={this.removeFromWatchlist} 
                />         
            </div>
        )
    }
}
 
export default MainPage;