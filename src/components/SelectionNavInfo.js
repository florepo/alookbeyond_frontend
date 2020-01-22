import React, { Component } from 'react'
import {Icon} from 'semantic-ui-react'

class SelectionNavInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div>
                 <h5>Menu Options</h5>
                 <div>
                    <Icon name='bullseye'/>
                    :: List of available Constellations
                </div>
                <div>
                    <Icon name='unhide'/>
                    :: List of viewed Objects
                </div>
                <div>
                    <Icon name='list'/>
                    :: List of available Watchlists
                </div>

                <br></br>
                <h5>Element Options</h5>
                <div>
                    <Icon name='info'/>
                    :: Get Info
                </div>
                <div>
                    <Icon name='unhide'/>
                    :: Shown > Click to Hide
                </div>
                <div>
                    <Icon name='hide'/>
                    :: Hidden > Click to Show
                </div>
            </div>
            
         );
    }
}
 
export default SelectionNavInfo;