import React,{ Component } from 'react'

import {Tab, List, Button, Icon, Card } from 'semantic-ui-react'
import _ from 'lodash'
import * as API from '../adapters/api'

import Viewport from './Viewport'
import SelectionContainer from './SelectionContainer'

class MainDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {  satellites: [],
                        constellations: [],
                        watchlist: [],
                        currentView: [],
                        color: 'blue' }
        }

    componentDidMount() {
        API.getConstellations().then(constellations => this.setState({constellations}))
        API.getSatellites().then(satellites => this.setState({satellites}))
    }

    addToWatchlist = (id) => {
        if (!!this.state.watchlist.find(sat => sat.id==id )) { 
            console.log("already selected")
        } else {
            let choosenSat = [...this.state.satellites].filter( sat => sat.id==id )
            let updatedwatchlist= [...this.state.watchlist].concat(choosenSat)
            this.setState({watchlist: updatedwatchlist})
        }
    }

    removeFromWatchlist = (id) => {
        let updateList = [...this.state.watchlist].filter( sat => sat.id!=id )
        this.setState({watchlist: updateList})
        this.setState({currentView: updateList})
    }

    removeFromCurrentView = (id) =>{
        console.log("remove from view",id)
        let updatedList = [...this.state.currentView].filter( sat => sat.id!=id )
        this.setState({currentView: updatedList})
    }

    handleColorChange = (e) => this.setState({ color: e.target.value })

    handleCatalogClick = (id) => {this.addToWatchlist(id)}

    handleConstellationClick = (id) => {
        console.log("clicked", id)
        console.log(this.state.constellations)
        const choosenConst = this.state.constellations.filter( c => c.id==id )[0]
        console.log(choosenConst)
        this.setForDisplay(choosenConst.satellites)
    }

    setForDisplay=(satList)=>{
        this.setState({currentView: satList})
    }

    //checks for clicks on Watchlist
    handleClickOnTab = (event) =>{
        event.persist()
        if (event.target.text=="Watchlist") {this.setState({ currentView: this.state.watchlist})}
    }
  

    panes = [
        {menuItem: 'Constellations',
            render: () => <Tab.Pane attached={false}>
                                <List selection verticalAlign='middle'>
                                    {this.state.constellations.map( item =>
                                        <List.Item key={item.name}
                                            onClick={() => this.handleConstellationClick(item.id)}
                                        >
                                            {item.name} 
                                        </List.Item>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        {
        menuItem: 'Catalog',
            render: () => <Tab.Pane attached={false}>
                                <List selection verticalAlign='middle'>
                                    {this.state.satellites.map( item =>
                                        <List.Item key={item.name} onClick={() => this.handleCatalogClick(item.id)}>
                                            <Button icon>
                                                <Icon name='plus'/>
                                            </Button>
                                            {item.name}  
                                        </List.Item>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        {
        menuItem: 'Watchlist',
            render: () => <Tab.Pane attached={false}>
                            <List selection verticalAlign='middle'>
                                {this.state.watchlist.map(item =>
                                    <List.Item key={item.name}>
                                        {item.name} 
                                    </List.Item>
                                )}
                            </List>

            </Tab.Pane>,
            },
    ]

    render() {
      return (
        <div>
            <div className="flex-row-container">
                <Tab className='sidebar'
                    menu={{ attached: false }}
                    panes={this.panes}
                    onClick={(e)=>this.handleClickOnTab(e)}
                />
                <Viewport 
                    className="viewport"
                    sats={this.state.currentView}
                />
            </div>
            <div>
                <SelectionContainer
                    sats={this.state.currentView}
                    remove={this.removeFromCurrentView}
                />
            </div>
        </div>



      )
    }
  }
 
export default MainDisplay;
