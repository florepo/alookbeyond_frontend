import React, { Component } from 'react'


class MarkerGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="marker-guide">
              <p>To view AR model please point this marker to the cam of your device </p>
            </div>
         );
    }
}
 
export default MarkerGuide;