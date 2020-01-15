import React,{ Component } from 'react'

import {Tab, List} from 'semantic-ui-react'
import {_} from 'lodash'

import * as API from '../adapters/api'

import Viewport from './Viewport'
import ConstListElement from '../components/ConstListElement'
import SatListElement from '../components/SatListElement'

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
        API.getSatellites().then(satellites => this.setState({satellites})).then(console.log)
    }

    addSatToWatchlist = (sat) => {
        if (!!this.state.watchlist.find(s => s==sat )) { 
            console.log("already selected")
        } else {
            let updatedWatchlist= [...this.state.watchlist].concat(sat)
            this.setState({watchlist: updatedWatchlist})
        }
    }

    addConToWatchList =(constellation)=> {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else {
            constellation.displayed=true
            console.log(constellation)
            let sats=[...constellation.satellites]
            let updatedWatchlist= [...this.state.watchlist].concat(sats)
            this.setState({watchlist: updatedWatchlist})
        }
    }

    removeConFromWatchList = (constellation) => {
        constellation.displayed=false
        let filteredList = [...this.state.watchlist].filter( s => s.constellation_id!=constellation.id )
        this.setState({watchlist: filteredList})
    }

    removeSatAndConFromWatchList = (sat) => {
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
                                        <ConstListElement
                                            key={constellation.name}
                                            item={constellation}
                                            addOnClick={this.addConToWatchList}
                                            removeOnClick={this.removeConFromWatchList}
                                        >
                                        </ConstListElement>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'catalog', icon: 'list', content: 'Catalog' },
            render: () =>   <Tab.Pane attached={false}>
                                <List divided verticalAlign='middle'>
                                    {this.state.satellites.map( item =>
                                        <SatListElement
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
                                        <SatListElement
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
                    <Tab className='sidetabs'
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
