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
                 <div>
                 <Icon name='bullseye'/>
                 :: Open List of Constellations
                 </div>
                 <div>
                 <Icon name='list'/>
                 :: Open List of Satellites
                 </div>
                 <div>
                 <Icon name='unhide'/>
                 :: Open List of Currently Viewed Objects
                 </div>
                 <div>
                 <Icon name='list'/>
                 :: Open List of Saved Watchlists
                 </div>
                 <div>
                 <Icon name='window close'/>
                 :: Open List of Saved Watchlists
                 </div>
            </div>
         );
    }
}
 
export default SelectionNavInfo;