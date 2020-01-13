import React,{ Component } from 'react'

import {Tab, List, Button, Icon, Card } from 'semantic-ui-react'
import _ from 'lodash'
import * as API from '../adapters/api'

import ThreeDisplay from './ThreeScene'
import SatCard from '../components/SatCard'

class MainDisplay2 extends Component {
    constructor(props) {
        super(props);
        this.state = {  satellites: [],
                        constellations: [],
                        watchlist: [],
                        selection: [],
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
    let updateList = [...this.state.watchlist].filter( bot => bot.id!=id )
    this.setState({watchlist: updateList})
    this.setState({selection: updateList})
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
        this.setState({selection: satList})
    }

    handleClickOnTab = (event) =>{ event.persist()
        if (event.target.text=="WatchList") {this.setState({ selection: this.state.watchlist})}
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
                                        <List.Item key={item.name}
                                            onClick={() => this.handleCatalogClick(item.id)}
                                        >
                                            <Button icon>
                                                <Icon name='plus' />
                                            </Button>
                                            {item.name}  
                                        </List.Item>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        {
        menuItem: 'WatchList',
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
        // <Container className="MainDisplay">
        <div>
            <Tab
                menu={{ attached: false }}
                panes={this.panes}
                onClick={(e)=>this.handleClickOnTab(e)}
            />
            {/* <ThreeDisplay
                className="ThreeDisplay"
                sats={this.state.selection}
            /> */}
            <Card.Group>
                {this.state.selection.map(sat => {
                    return (<SatCard key={sat.id} 
                                info={sat}
                                remove={this.removeFromWatchlist}
                            />)
                })}
            </Card.Group>

        </div>



      )
    }
  }
 
export default MainDisplay2;
