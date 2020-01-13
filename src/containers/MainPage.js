import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import NavBar from './NavBar'
import MainDisplay2 from './MainDisplay2'
import Footer from './Footer'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {watchlist: []
                    }
      }
      
    
    render() { 
        return (
            <Container className="App">
            <Grid>
                <Grid.Row>
                <NavBar className="NavBar" 
                />
                </Grid.Row>    
                <Grid.Row>
                <MainDisplay2 className="MainDisplay"
                    watchlist={this.state.watchlist}
                    addSatToWatchList={this.addToWatchlist}  
                    removeSat={this.removeFromWatchlist}          
                /> 
                </Grid.Row>   
                <Footer className="Footer"
                />
            </Grid>
            </Container>
        )
    }
}
 
export default MainPage;