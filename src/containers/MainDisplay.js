import React,{ Component } from 'react'

import {Tab, List, Button, Icon, Image} from 'semantic-ui-react'
import {_, differenceBy} from 'lodash'

import * as API from '../adapters/api'

import Viewport from './Viewport'
import ListElement from '../components/ListElement'
import WatchListElement from '../components/WatchListElement'

class MainDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {  
                        constellations: [],
                        satellites: [],
                        watchlist: [],
                        display: [],
                        color: 'blue' }
        }

    componentDidMount() {
        API.getConstellations().then(constellations => this.setState({constellations}))
        API.getSatellites().then(satellites => this.setState({satellites}))
        API.getSatellites().then(satellites => this.setState({watchlist: satellites}))
    }

    // addToDisplay=(satList)=>{ this.setState({currentDisplay: satList}) }

    // removeFromDisplay = (id) =>{
    //     console.log("remove from view",id)
    //     let updatedList = [...this.state.currentView].filter( sat => sat.id!=id )
    //     this.setForDisplay(updatedList)
    // }

    // removeFromDisplay = (satlist) => {
    //     differenceBy(satlist,this.state)
    // }


    addSatToWatchlist = (sat) => {
        console.log("sat. add check-in")
        if (!!this.state.watchlist.find(s => s==sat )) { 
            console.log("already selected")
        } else {
            let updatedWatchlist= [...this.state.watchlist].concat(sat)
            this.setState({watchlist: updatedWatchlist})
        }
    }

    // handleColorChange = (e) => this.setState({ color: e.target.value })

    handleConstellationClick = (c) => {
        console.log("clicked", c)
        // this needs to change, needs to be broken down into single satellites
        console.log("already shown?",this.state.currentView.includes(c))
        if (this.state.currentView.includes(c)){
            console.log("should remove now")
        } else  {
            this.setForDisplay(c.satellites)
        }
    }

    addConToWatchList =(constellation)=> {
        if (constellation.displayed==true){
            console.log("already selected")
        } else {
            constellation.displayed=true
            console.log(constellation)
            let sats=[...constellation.satellites]
            let updatedWatchlist= [...this.state.watchlist].concat(sats)
            this.setState({watchlist: updatedWatchlist})

        }
    }

    removeConFromWatchList =(constellation)=> {
        constellation.displayed=false
        let filteredList = [...this.state.watchlist].filter( s => s.constellation_id!=constellation.id )
        this.setState({watchlist: filteredList})
    }

    removeSatAndConFromWatchList =(sat)=> {
        sat.displayed=false
        let filteredList = [...this.state.watchlist].filter( s => s.constellation_id!=sat.constellation_id )
        this.setState({watchlist: filteredList})
    }
  
    addSatToWatchlist = (sat) => {
        if (sat.displayed==true) { 
            console.log("already selected")
        } else {
            sat.displayed=true
            let updatedWatchlist= [...this.state.watchlist].concat(sat)
            this.setState({watchlist: updatedWatchlist})
        }
    }

    removeSatFromWatchlist = (sat) => {
        sat.displayed=false
        let filteredList = [...this.state.watchlist].filter( s => s!=sat )
        this.setState({watchlist: filteredList})
    }

  
    panes = [
        {menuItem: { key: 'constellation', icon: 'bullseye', content: 'Constellations' },
            render: () =>   <Tab.Pane attached={false}>
                                <List divided verticalAlign='middle'>
                                    {this.state.constellations.map( constellation =>
                                        <ListElement
                                            key={constellation.name}
                                            item={constellation}
                                            addOnClick={this.addConToWatchList}
                                            removeOnClick={this.removeConFromWatchList}
                                        >
                                        </ListElement>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'catalog', icon: 'list', content: 'Catalog' },
            render: () =>   <Tab.Pane attached={false}>
                                <List divided verticalAlign='middle'>
                                    {this.state.satellites.map( item =>
                                        <ListElement
                                            key={item.name}
                                            item={item}
                                            addOnClick={this.addSatToWatchlist}
                                            removeOnClick={this.removeSatFromWatchlist}
                                        />
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'watchlist', icon: 'unhide', content: 'Watchlist' },
            render: () =>   <Tab.Pane attached={false}>
                                <List divided verticalAlign='middle'>
                                    {this.state.watchlist.map(item =>
                                        <WatchListElement
                                            key={item.name}
                                            item={item}
                                            removeSatOnClick={this.removeSatFromWatchlist}
                                            removeSatAndConOnClick={this.removeSatAndConFromWatchList}
                                        />
                                    )}
                                </List>
                            </Tab.Pane>,
        },
    ]

    render() {
      return (  <div className="flex-row-container">
                    <Tab className='sidebar'
                        menu={{ attached: false }}
                        panes={this.panes}
                    />
                    <Viewport 
                        className="viewport"
                        sats={this.state.watchlist}
                    />
                 </div>
            )
    }
}

export default MainDisplay;
