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
                   satCollection: [],
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
  
  addSatToCollection=(id)=>{
    console.log('sat added to collection')
    let satResults = [...this.state.satResults]
    let satCollection = [...this.state.satCollection]
    let choosenSat = satResults.filter(sat=>{return sat.id==id})
    let updatedCollection= satCollection.concat(choosenSat)
    //setState
    this.setState({satCollection: updatedCollection})
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
                mySats={this.state.satResults} 
                addSat={this.addSatToCollection}       
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
