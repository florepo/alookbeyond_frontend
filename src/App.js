import React, {Component} from 'react';
import './App.css';
import NavBar from './containers/NavBar'
import Footer from './containers/Footer'
import {Container,Grid} from 'semantic-ui-react'

import MainDisplay from './containers/MainDisplay'


const API_ENDPOINT='https://data.ivanstanojevic.me/api/tle?search='
const page_size="&page-size=200"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { satResults: [{name:"one", id:1},{name:"two",id:2}, {name:"three", id:3}],
                   satCollection: [{name:"four", id:4}],
                   searchTerm: null }
  }

  fetchData=(query)=>{
    const url=API_ENDPOINT+query+page_size
    console.log(url)
    return fetch(url)
        .then(response=>response.json())
        .then(data=> this.setState({satTLE: data.member}))
  }
  
  handleSearch=(query)=>{
    console.log("set new query",query)
    this.setState({searchTerm: query})
    this.fetchData(query)
  }
  
  addToCollection=(id)=>{
    console.log('sat added to collection')
    let satResults = [...this.state.satResults]
    let satCollection = [...this.state.satCollection]
    let choosenSat = satResults.filter(sat=>{return sat.id==id})
    let updatedCollection= satCollection.concat(choosenSat)
    //setState
    this.setState({satCollection: updatedCollection})
  }

  removeFromCollection=(id)=>{
    console.log('dismissed')
    let satCollection = [...this.state.satCollection]
    let updateCollection = satCollection.filter(bot=>{return bot.id!=id})

    this.setState({satCollection: updateCollection})
  }




  componentDidMount(){
    // this.fetchData('GPS')
  }

  render() { 
    return (
      <div className="App">
        <Container>
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
      </div>
    );
  }
}

export default App;
