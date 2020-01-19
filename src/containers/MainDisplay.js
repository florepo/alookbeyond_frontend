import React,{ Component, useState, useEffect } from 'react'

import {Tab, List} from 'semantic-ui-react'
import {_} from 'lodash'

import * as API from '../adapters/api'

import Viewport from './Viewport'
import ConstListElement from '../components/ConstListElement'
import SatListElement from '../components/SatListElement'
import WatchListElement from '../components/WatchListElement'

const MainDisplay = (props) => {

    const [constellations, setConstellations] = useState([])
    const [satellites, setVatellites] = useState([])
    const [view, setView] = useState([])
    const [tracking, setTracking] = useState([])
    const [count, setCount] = useState(0)

       
    useEffect(() => {
        API.getConstellations()
            .then(constellations => setConstellations(constellations))
       }, [])

    const addOrFetchSatsForConstellationToView = (constellation) => {

        if (constellation.displayed==true) {
            console.log("already selected")
        } else if (!constellation.satellites) {
            console.log("fetch satellites for constellation and to view")
            constellation.displayed=true
            API.getConstellationSats(constellation.id)
                .then(constellation => constellation.satellites)
                .then(sats => setView(sats))
        } else {
            console.log("add to vieew")
            debugger
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...view]
            updatedViewlist.concat(sats)
            setView(updatedViewlist)
        }
    }


    const addSatToView = (sat) => {
        console.log("add to view")
        if (!!setView.find(s => s==sat )) { 
            console.log("already selected")
        } else {
            sat.displayed=true
            let updatedViewlist= [...view].concat(sat)
            setView(updatedViewlist)
        }
    }

    const removeSatFromView = (sat) => {
        console.log("remove from view")
        sat.displayed=false
        let filteredList = [...view].filter( s => s!=sat )
        setView(filteredList)
    }

    const addConstellationToView =(constellation)=> {
        if (constellation.displayed==true) {
            console.log("already selected")
        } else {
            console.log("add to vieew")
            constellation.displayed=true
            let sats = [...constellation.satellites]
            let updatedViewlist= [...view]
            updatedViewlist.concat(sats)
            setView(updatedViewlist)
        }
    }

    const removeConstellationFromView = (constellation) => {
        console.log("remove from view")
        constellation.displayed=false
        let filteredList = [...view].filter( s => s.constellation_id != constellation.id )
        setView(filteredList)
    }

    const removeSatAndConFromView = (sat) => {
        console.log("remove from view")
        sat.displayed=false
        let filteredList = [...view].filter( s => s.constellation_id != sat.constellation_id )
        setView(filteredList)
    }
  
    const panes = [
        {menuItem: { key: 'constellation', icon: 'bullseye', content: 'Constellations' },
            render: () =>   <Tab.Pane attached={false}>
                                <List divided verticalAlign='middle'>
                                    {constellations.map( constellation =>
                                        <ConstListElement
                                            key={constellation.name}
                                            item={constellation}
                                            addOnClick={addOrFetchSatsForConstellationToView}
                                            removeOnClick={removeConstellationFromView}
                                        >
                                        </ConstListElement>
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'catalog', icon: 'list', content: 'Catalog' },
            render: () =>   <Tab.Pane attached={false}>
                    <List divided verticalAlign='middle'>
                                    {satellites.map( item =>
                                        <SatListElement
                                            key={ item.name}
                                            item={item}
                                            addOnClick={addSatToView}
                                            removeOnClick={this.removeSatFromView}
                                        />
                                    )}
                                </List>
                            </Tab.Pane>,
        },
        { menuItem: { key: 'view', icon: 'unhide', content: 'View' },
        render: () =>   <Tab.Pane attached={false}>
                            <List divided verticalAlign='middle'>
                                {view.map( item =>
                                    <WatchListElement
                                        key={item.name}
                                        item={item}
                                        removeSatOnClick={removeSatFromView}
                                        removeSatAndConOnClick={removeSatAndConFromView}
                                    />
                                )}
                            </List>
                        </Tab.Pane>,
    }
       
    ]

      return (  <div className="flex-row-container">
                    <Tab className='sidetabs'
                        menu={{ attached: false }}
                        panes={panes}
                    />
                    <Viewport 
                        className="viewport"
                        sats={view}
                    />
                 </div>
            )
}

export default MainDisplay;
