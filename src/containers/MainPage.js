import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import NavBar from './NavBar'
import MainDisplay from './MainDisplay'
import Footer from './Footer'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { satResults: [{name: "NOAA 6", 
                                    id: "NOAA 6",                 
                                    TLE1: "1 11416U 79057A   20009.54513310  .00000022  00000-0  24252-4 0  9997",
                                    TLE2: "2 11416  98.6497   8.4074 0010515   9.8375 350.3013 14.33560503114017"},
                                    {name: "RAPIDEYE 2",
                                    id: "RAPIDEYE 2",              
                                    TLE1: "1 33312U 08040A   20010.44750758 -.00000482  00000-0 -44752-4 0  9999",
                                    TLE2: "2 33312  97.7189  78.5526 0013472 162.7734 197.3970 14.89553922614134"},
                                    {name:"ISS (ZARYA)", 
                                    id: "ISS (ZARYA)",           
                                    TLE1: "1 25544U 98067A   20009.58914988 -.00000025  00000-0  76486-5 0  9997",
                                    TLE2: "2 25544  51.6454  58.1754 0005256 115.3542  45.1089 15.49547809207273"},
                                    {name: "CALSPHERE 1",
                                    id: "CALSPHERE 1",             
                                    TLE1:   "1 00900U 64063C   20009.16444188  .00000200  00000-0  20429-3 0  9997",
                                    TLE2:   "2 00900  90.1487  25.8173 0027499 174.4105 274.5255 13.73317584748459"}
                                    ],
                       satCollection: [],
                       searchTerm: null }
      }

      addToCollection=(id)=>{
        console.log('sat added to collection')
        let satResults = [...this.state.satResults]
        let satCollection = [...this.state.satCollection]
        let choosenSat = satResults.filter(sat=>{return sat.id==id})
        let updatedCollection= satCollection.concat(choosenSat)
        this.setState({satCollection: updatedCollection})
      }
    
      removeFromCollection=(id)=>{
        console.log('sat removed from to collection')
        let satCollection = [...this.state.satCollection]
        let updateCollection = satCollection.filter(bot=>{return bot.id!=id})
    
        this.setState({satCollection: updateCollection})
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
                <MainDisplay className="MainDisplay"
                    fetchedSats={this.state.satResults} 
                    mySats={this.state.satCollection} 
                    addSat={this.addToCollection}  
                    removeSat={this.removeFromCollection}          
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