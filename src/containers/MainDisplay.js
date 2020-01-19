import React,{ Component} from 'react'

import {Tab, List, Button, Segment} from 'semantic-ui-react'
import {_} from 'lodash'

import * as API from '../adapters/api'

import Viewport from './Viewport'
import ConstellationList from './ConstellationList'
import ConstListElement from '../components/ConstListElement'
import SatListElement from '../components/SatListElement'
import SaveViewModal from '../components/SaveViewModal'
import ViewListElement from '../components/ViewListElement'

class MainDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { constellations: [],
                       satellites: [],
                       view: [],
                       watchlists: [],
                       modalOpen: false
                    }
    }

    componentDidMount(){
        API.getConstellations().then(constellations => this.setState({constellations}))
        API.getWatchlists().then(watchlists => this.setState({watchlists}))
    }

    addOrFetchSatsForConstellationToView = (constellation) => {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else if (!constellation.satellites) {
            console.log("fetch satellites for constellation and to view")
            constellation.displayed=true
            API.getConstellationSats(constellation.id)
                .then(constellation => this.addSatellitesToView(constellation.satellites))
        } else {
            console.log("add to view")
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...this.state.view]
            debugger
            updatedViewlist.concat(sats)
            debugger
            this.setState({view: updatedViewlist})
        }
    }

    addSatellitesToView = (sats) =>{
        console.log("add satellites to view")
        let satsToAdd = sats.filter(s => s.displayed!=true)
        let updatedViewlist= [...this.state.view].concat(satsToAdd)
        console.log("elements to add:",updatedViewlist.length)
        this.setState({view: updatedViewlist})
    }

    addSatelliteToView = (sat) => {
        // console.log("add to view")
        if (!!this.state.view.find(s => s==sat )) { 
            console.log("already selected")
        } else {
            sat.displayed=true
            let updatedViewlist= [...this.state.view].concat(sat)
            this.setState({view: updatedViewlist})
        }
    }

    removeSatelliteFromView = (sat) => {
        console.log("remove from view")
        sat.displayed=false
        let updatedViewlist = [...this.state.view].filter( s => s.id!=sat.id )
        this.setState({view: updatedViewlist})
    }

    addConstellationToView =(constellation)=> {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else {
            // console.log("add to vieew")
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...this.state.view]
            updatedViewlist.concat(sats)
            this.setState({view: updatedViewlist})
        }
    }

    removeConstellationFromView = (constellation) => {
        console.log("remove constellation from view")
        constellation.displayed=false
        let updatedViewlist = [...this.state.view].filter( s => s.constellation_id != constellation.id )
        this.setState({view: updatedViewlist})
    }

    removeSatelliteWithConstellationFromView = (sat) => {
        console.log("remove Sat&Const from view")
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
       console.log(item.description)
    }
  
    panes =  [
        {menuItem: { key: 'constellation', icon: 'bullseye', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                                <ConstellationList 
                                    constellations={this.state.constellations}
                                    addOnClick={this.addOrFetchSatsForConstellationToView}
                                    removeOnClick={this.removeConstellationFromView}
                                    showInfoOnClick={this.showConstellationInfoOnClick}
                                />
                            </Tab.Pane>,
        },
        { menuItem: { key: 'catalog', icon: 'list', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'view', icon: 'unhide', content: '' },
            render: () =>   <Tab.Pane attached={false}>
                                {(this.state.view.lengt==0)? 
                                null 
                                : 
                                <React.Fragment>
                                    <Button
                                        attached='top'
                                        onClick={() => {this.setState({ modalOpen: true })}}
                                    >
                                        Save As
                                    </Button>
                                    <SaveViewModal // invisible modal itself
                                        key='modal1'
                                        modalOpen={this.state.modalOpen}
                                        handleClose={ () => {this.setState({ modalOpen: false })}}
                                        valueIntoModal={this.state.view}
                                    />
                                    <Segment attached>
                                        <List divided verticalAlign='middle'>
                                            {this.state.view.map( item =>
                                                <ViewListElement
                                                    key={item.name} item={item}
                                                    removeSatOnClick={this.removeSatelliteFromView}
                                                    removeSatAndConOnClick={this.removeSatelliteWithConstellationFromView }
                                                />
                                            )}
                                        </List>
                                    </Segment>
                                </React.Fragment>}
                            </Tab.Pane>,
        },
        // ,
    // { menuItem: { key: 'watchlist', icon: 'copy outline unhide',  content: '' },
    //     render: () =>   <Tab.Pane attached={false}>
    //                     <List divided verticalAlign='middle'>
    //                         {this.state.watchlists.map( item =>
    //                             <ConstListElement
    //                                 key={item.name} item={item}
    //                                 addOnClick={this.addOrFetchSatsForConstellationToView}
    //                                 removeOnClick={this.removeConstellationFromView}
    //                             />
    //                         )}
    //                     </List>
    //                 </Tab.Pane>,
    // },
    ]

    render() {
        return (  <div className="flex-row-container">
                    <Tab className='sidetabs'
                        menu={{ attached: false }}
                        panes={this.panes}
                    />
                    <Viewport 
                        className="viewport"
                        sats={this.state.view}
                    />
                </div>
        )
    }

}

export default MainDisplay