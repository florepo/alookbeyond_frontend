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
                                    {name: "SKYNET 4C ",
                                    id: "SKYNET 4C ",       
                                    TLE1: "1 20776U 90079A   20009.15256995  .00000136  00000-0  00000+0 0  9999",
                                    TLE2: "2 20776  13.9796   7.2950 0003220 282.5585 266.6095  1.00277087107367"},
                                   {name: "INMARSAT 3-F1",           
                                    id: "INMARSAT 3-F1", 
                                    TLE1: "1 23839U 96020A   20010.13527057  .00000013  00000-0  00000+0 0  9998",
                                    TLE2: "2 23839   5.7635  63.1242 0005326 230.7711 288.3891  1.00272578 87059"}
                                    ],
                       satCollection: [{name:"ISS (ZARYA)", 
                                        id: "ISS (ZARYA)",           
                                        TLE1: "1 25544U 98067A   20009.58914988 -.00000025  00000-0  76486-5 0  9997",
                                        TLE2: "2 25544  51.6454  58.1754 0005256 115.3542  45.1089 15.49547809207273"},
                                        {name: "CALSPHERE 1",
                                        id: "CALSPHERE 1",             
                                        TLE1:   "1 00900U 64063C   20009.16444188  .00000200  00000-0  20429-3 0  9997",
                                        TLE2:   "2 00900  90.1487  25.8173 0027499 174.4105 274.5255 13.73317584748459"}
                                        ],
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