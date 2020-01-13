import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import NavBar from './NavBar'
import MainDisplay from './MainDisplay'
import Footer from './Footer'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {watchlist: []
                    }
      }

    render() { 
        return (
            <div>
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