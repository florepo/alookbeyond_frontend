import React, { Component } from 'react'
import {Card} from 'semantic-ui-react'

import SatCard from '../components/SatCard'

const SelectionContainer =({sats, removeSat})=> {

        return ( 
            <div className="selectionContainer">
                <Card.Group>
                    {sats.map(sat => {
                        return <SatCard 
                                    key={sat.id}
                                    info={sat}
                                    removeHandler={removeSat}
                                />
                    })}
                </Card.Group>
            </div>
         );

}
 
export default SelectionContainer;