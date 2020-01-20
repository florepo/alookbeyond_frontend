import React,{ Component} from 'react'
import {Tab, List, Button, Segment} from 'semantic-ui-react'
import Viewport from './Viewport'
import ListOfViewElements from '../containers/ListOfViewElements'
import ListOfConstellations from './ListOfConstellations'
import SelectionContainer from './SelectionContainer'
import ListOfWatchlists from '../containers/ListOfWatchlists'
import {_} from 'lodash'
import * as API from '../adapters/api'

class MainDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { constellations: [],
                       satellites: [],
                       view: [],
                       watchlists: [],
                       selection: [],
                       modalOpen: false }
    }

    componentDidMount(){
        API.getConstellations().then(constellations => this.setState({constellations}))
        API.getWatchlists().then(watchlists => this.setState({watchlists: watchlists.slice(4, watchlists.length)}))
        // this.setState({view: this.props.loadedView})
    }

    addOrFetchSatsForConstellationToView = (constellation) => {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else if (!constellation.satellites) {
            constellation.displayed=true
            API.getConstellationSats(constellation.id)
                .then(constellation => this.addSatellitesToView(constellation.satellites))
        } else {
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...this.state.view]
            updatedViewlist.concat(sats)
            this.setState({view: updatedViewlist})
        }
    }

    addSatellitesToView = (sats) =>{
        let satsToAdd = sats.filter(s => s.displayed!=true)
        let updatedViewlist= [...this.state.view].concat(satsToAdd)
        this.setState({view: updatedViewlist})
    }

    addSatelliteToView = (sat) => {
        if (!!this.state.view.find(s => s==sat )) { 
        } else {
            sat.displayed=true
            let updatedViewlist= [...this.state.view].concat(sat)
            this.setState({view: updatedViewlist})
        }
    }

    removeSatelliteFromView = (sat) => {
        sat.displayed=false
        let updatedViewlist = [...this.state.view].filter( s => s.id!=sat.id )
        this.setState({view: updatedViewlist})
    }

    addConstellationToView =(constellation)=> {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else {
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...this.state.view]
            updatedViewlist.concat(sats)
            this.setState({view: updatedViewlist})
        }
    }

    removeConstellationFromView = (constellation) => {
        constellation.displayed=false
        let updatedViewlist = [...this.state.view].filter( s => s.constellation_id != constellation.id )
        this.setState({view: updatedViewlist})
    }

    removeSatelliteWithConstellationFromView = (sat) => {
        sat.displayed=false
        let constellationList = [...this.state.constellations]
        let constellation = constellationList.filter(c => c.id == sat.constellation_id)
        let constellations = constellationList.filter(c => c.id != sat.constellation_id)
        
        constellation.displayed=false
        constellations.push(constellation)
        let updatedViewlist = [...this.state.view].filter( s => s.constellation_id != sat.constellation_id )
        this.setState({view: updatedViewlist, constellations: constellations})
    }

    showConstellationInfoOnClick = (item) => {
       this.setState({selection: [item]})
    }

    loadWatchlistInView = (item) => {
        this.setState({view: item.satellites})
    }

    clearView = () => {
        this.setState({view: []})
    }
  
    panes =  [
        {   menuItem: { key: 'constellation', icon: 'bullseye', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                                <ListOfConstellations
                                    constellations={this.state.constellations}
                                    addOnClick={this.addOrFetchSatsForConstellationToView}
                                    removeOnClick={this.removeConstellationFromView}
                                    showInfoOnClick={this.showConstellationInfoOnClick}
                                />
                            </Tab.Pane>,
        },
        {   menuItem: { key: 'catalog', icon: 'list', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                            </Tab.Pane>,
        },
        {   menuItem: { key: 'view', icon: 'unhide', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                                {(this.state.view.length==0)? 
                                null 
                                : 
                                <ListOfViewElements 
                                    view={this.state.view}
                                    watchlists={this.state.watchlists}
                                    removeSatOnClick={this.removeSatelliteFromView}
                                    removeSatAndConOnClick={this.removeSatelliteWithConstellationFromView }
                                    clearView={this.clearView}
                                />
                                }
                            </Tab.Pane>,
        },
        {   menuItem: { key: 'catalog', icon: 'list', content: '' },
        render: () =>   <Tab.Pane attached={false}>
                            <ListOfWatchlists 
                                 watchlists={this.state.watchlists}
                                 loadWatchlistInView={this.loadWatchlistInView}
                            />
                        </Tab.Pane>,
        },
    ]

    render() {
        return (    <div className="main-display-container">
                        <Tab 
                            className='sidetabs'
                            menu={{ attached: false }}
                            panes={this.panes}
                        />
                    <div className='flex-ccolumn-container'>
                        <Viewport 
                            className="viewport"
                            sats={this.state.view}
                        />
                        <SelectionContainer 
                            className="selection-container"
                            info={this.state.selection}
                        />
                    </div>
                </div>
        )
    }

}

export default MainDisplay